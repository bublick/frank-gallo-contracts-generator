function parseSections(inputText) {
    // Divide input text into sections based on ÉTAPE markers
    const sections = {};
    const sectionRegex = /(ÉTAPE \d+ - .+?)\n([\s\S]*?)(?=ÉTAPE \d+|$)/g;
    let match;

    while ((match = sectionRegex.exec(inputText)) !== null) {
        const sectionTitle = match[1].trim();
        const sectionContent = match[2].trim();
        sections[sectionTitle] = sectionContent;
    }

    return sections;
}

function processEtape1And2(sectionContent) {
    // Extract field-value pairs
    const fields = {};
    const lines = sectionContent.split("\n");
    for (let i = 0; i < lines.length; i += 2) {
        const key = lines[i].trim();
        const value = lines[i + 1]?.trim() || "";
        fields[key] = value;
    }
    return fields;
}

function processEtape3AndBeyond(sectionContent, objectConfig) {
    const lines = sectionContent.trim().split('\n');
    let inventory = "";
    let totalVolume = 0;
    let totalLoadingTime = 0;
    let totalUnloadingTime = 0;
    
    let i = 0; // We use 'i' to iterate over the lines
    while (i < lines.length) {
        const line = lines[i].trim(); // Current line (object name)
        console.log("Line:", line);
        i++; // Move to the next line for the quantity
        const quantityLine = i < lines.length ? lines[i].trim() : ''; // Next line (quantity)

        let quantity = parseInt(quantityLine, 10) || 0; // Parse quantity, default to 0 if invalid
        if (quantity > 0) {
            // Check if the object name exists in the objectConfig
            for (let objectName in objectConfig) {
                if (line.toLowerCase().includes(objectName.toLowerCase())) {
                    const objectData = objectConfig[objectName];
                    let variant = null;

                    // Check for variant
                    if (objectData.variants) {
                        for (let variantName in objectData.variants) {
                            if (line.toLowerCase().includes(variantName.toLowerCase())) {
                                variant = objectData.variants[variantName];
                                break;
                            }
                        }
                    }

                    // Use variant values if found, otherwise use default object values
                    const volume = variant ? variant.volume : objectData.volume;
                    const loadingTime = variant ? variant.loadingTime : objectData.loadingTime;
                    const unloadingTime = variant ? variant.unloadingTime : objectData.unloadingTime;

                    // Add to inventory and calculate totals
                    inventory += `${quantity} x ${variant ? `${variantName} ` : ""}${objectName}; `;
                    totalVolume += volume * quantity;
                    totalLoadingTime += loadingTime * quantity;
                    totalUnloadingTime += unloadingTime * quantity;

                    break; // Break since the object has been found and processed
                }
            }
        }
        
        i++; // Move to the next object/quantity pair
    }

    return {
        inventory: inventory.trim(),
        totalVolume,
        totalLoadingTime,
        totalUnloadingTime,
    };
}


function processInput(inputText, objectConfig) {
    // Parse the sections
    const sections = parseSections(inputText);

    // Process each section
    const etape1Data = sections["ÉTAPE 1 - INFORMATIONS CLIENT"]
        ? processEtape1And2(sections["ÉTAPE 1 - INFORMATIONS CLIENT"])
        : {};
    const etape2Data = sections["ÉTAPE 2 - INFORMATIONS DÉMÉNAGEMENT"]
        ? processEtape1And2(sections["ÉTAPE 2 - INFORMATIONS DÉMÉNAGEMENT"])
        : {};
    const etape3Data = sections["ÉTAPE 3 - ÉLÉCTROMÉNAGERS"]
        ? processEtape3AndBeyond(sections["ÉTAPE 3 - ÉLÉCTROMÉNAGERS"], objectConfig)
        : {};
    const etape4Data = sections["ÉTAPE 4 - MEUBLES DE CHAMBRE"]
        ? processEtape3AndBeyond(sections["ÉTAPE 4 - MEUBLES DE CHAMBRE"], objectConfig)
        : {};
    const etape5Data = sections["ÉTAPE 5 - MEUBLES DE SALON - SALLE À MANGER - BUREAU ET ACCESSOIRES"]
        ? processEtape3AndBeyond(sections["ÉTAPE 5 - MEUBLES DE SALON - SALLE À MANGER - BUREAU ET ACCESSOIRES"], objectConfig)
        : {};

    return {
        etape1Data,
        etape2Data,
        etape3Data,
        etape4Data,
        etape5Data,
    };
}

// Example Usage
const inputText = `
    ÉTAPE 1 - INFORMATIONS CLIENT

    NOM ET PRÉNOM
    Élodie Marchand

    TITRE
    Mme

    COURRIEL
    elodiemarchand@example.com

    TÉLÉPHONE
    4387125698

    ÉTAPE 2 - INFORMATIONS DÉMÉNAGEMENT

    DATE
    2024-08-15

    DATE FLEXIBLE ?
    Oui, entre le 15 et 20 août

    ADRESSE DE DÉPART + VILLE
    3450 Rue Wellington

    ÉTAGE ADRESSE DE DÉPART
    Rez-de-chaussée

    ADRESSE DESTINATION + VILLE
    2899 Rue Sherbrooke Ouest

    ÉTAGE ADRESSE DE DESTINATION
    2e niveau

    ÉTAPE 3 - ÉLÉCTROMÉNAGERS

    GRAND RÉFRIGÉRATEUR
    1

    RÉFRIGÉRATEUR
    0

    PETIT RÉFRIGÉRATEUR
    1

    GROS CONGÉLATEUR
    1

    CONGÉLATEUR MOYEN
    0

    CUISINIÈRES - FOUR/POÊLE
    1

    LAVE VAISSELLE
    0

    SÉCHEUSE
    1

    LAVEUSE
    1

    LAVEUSE - SECHEUSE SUPERPOSÉES ?
    Non

    ÉTAPE 4 - MEUBLES DE CHAMBRE

    BASE DE LIT KING
    0

    BASE DE LIT QUEEN
    1

    BASE DE LIT DOUBLE
    0

    BASE DE LIT SIMPLE
    0

    MATELAS KING
    0

    MATELAS QUEEN
    1

    MATELAS DOUBLE
    0

    MATELAS SIMPLE (PETIT)
    0

    SOMMIER KING
    0

    SOMMIER QUEEN
    1

    SOMMIER DOUBLE
    0

    SOMMIER SIMPLE
    0

    COMMODE
    1

    TABLE DE CHEVET
    2

    ARMOIRE (2 PORTES)
    1

    ARMOIRE (1 PORTE)
    1

    BERCEAU
    0

    ÉTAPE 5 - MEUBLES DE SALON - SALLE À MANGER - BUREAU ET ACCESSOIRES

    CAUSEUSE (DIVAN 2 PLACES)
    1

    SOFA/CANAPÉ (3 PLACES)
    1

    FAUTEUIL
    3

    MEUBLE TÉLÉ (GRAND)
    0

    TÉLÉVISEUR (GRAND)
    0

    TÉLÉVISEUR (MOYEN/PETIT)
    1

    TABLE DE CAFÉ, DE BOUT
    2

    TABLES À MANGER OU DE TERRASSE
    1

    CHAISES
    4

    BIBILIOTHEQUE
    1

    ARMOIRE DE DOSSIER À TIROIR
    0

    DESSERTE, HUCHE, CABINETS
    1

    MIROIRS - CADRES
    4

    GRAND TAPIS
    1

    TAPIS (PETIT OU MOYEN)
    3

    LAMPES ET ABAT-JOURS
    3

    COFFRE FORT
    1

    PIANO
    Moyen

    BARBECUE
    1

    VALISES
    4

    PNEUS
    1

    TAPIS ROULANT
    1

    VÉLOS STATIONNAIRES
    1

    BICYCLETTES / VÉLOS
    2

    TABLE DE BILLARD
    1

    VOS BOITES (APPROXIMATIF)
    12

    BOITES GARDE-ROBE (4 FOURNIES)
    8

    PLUS DE PRÉCISIONS
    Meubles vintage à transporter avec soin
`;

const objectConfig = {
    "RÉFRIGÉRATEUR": {
        volume: 1,
        loadingTime: 0.15,
        unloadingTime: 0.1,
        variants: {},
    },
    "GRAND RÉFRIGÉRATEUR": {
        volume: 1.3,
        loadingTime: 0.2,
        unloadingTime: 0.15,
        variants: {},
    },
    "PETIT RÉFRIGÉRATEUR": {
        volume: 0.5,
        loadingTime: 0.15,
        unloadingTime: 0.1,
        variants: {},
    },
    "GROS CONGÉLATEUR": {
        volume: 1,
        loadingTime: 0.15,
        unloadingTime: 0.12,
        variants: {},
    },
    "CONGÉLATEUR MOYEN": {
        volume: 0.6,
        loadingTime: 0.1,
        unloadingTime: 0.08,
        variants: {},
    },
    "CUISINIÈRES - FOUR/POÊLE": {
        volume: 0.6,
        loadingTime: 0.1,
        unloadingTime: 0.08,
        variants: {},
    },
    "LAVE VAISSELLE": {
        volume: 0.4,
        loadingTime: 0.1,
        unloadingTime: 0.07,
        variants: {},
    },
    "SÉCHEUSE": {
        volume: 0.6,
        loadingTime: 0.1,
        unloadingTime: 0.07,
        variants: {},
    },
    "LAVEUSE": {
        volume: 0.6,
        loadingTime: 0.1,
        unloadingTime: 0.07,
        variants: {},
    },
    "Sécheuse au dessus laveuse": {
        volume: 0,
        loadingTime: 0.1,
        unloadingTime: 0.1,
        variants: {},
    },
    "BASE DE LIT KING": {
        volume: 0.5,
        loadingTime: 0.2,
        unloadingTime: 0.13,
        variants: {},
    },
    "BASE DE LIT QUEEN": {
        volume: 0.3,
        loadingTime: 0.11,
        unloadingTime: 0.08,
        variants: {},
    },
    "BASE DE LIT DOUBLE": {
        volume: 0.3,
        loadingTime: 0.11,
        unloadingTime: 0.08,
        variants: {},
    },
    "BASE DE LIT SIMPLE": {
        volume: 0.25,
        loadingTime: 0.1,
        unloadingTime: 0.07,
        variants: {},
    },
    "MATELAS KING": {
        volume: 0.5,
        loadingTime: 0.15,
        unloadingTime: 0.05,
        variants: {},
    },
    "MATELAS QUEEN": {
        volume: 0.4,
        loadingTime: 0.05,
        unloadingTime: 0.03,
        variants: {},
    },
    "MATELAS DOUBLE": {
        volume: 0.35,
        loadingTime: 0.03,
        unloadingTime: 0.02,
        variants: {},
    },
    "MATELAS SIMPLE": {
        volume: 0.2,
        loadingTime: 0.03,
        unloadingTime: 0.02,
        variants: {},
    },
    "MATELAS SIMPLE(PETIT)": {
        volume: 0.2,
        loadingTime: 0.03,
        unloadingTime: 0.02,
        variants: {},
    },
    "SOMMIER KING": {
        volume: 0.2,
        loadingTime: 0.03,
        unloadingTime: 0.02,
        variants: {},
    },
    "SOMMIER SIMPLE": {
        volume: 0.2,
        loadingTime: 0.03,
        unloadingTime: 0.02,
        variants: {},
    },
    "SOMMIER QUEEN": {
        volume: 0.3,
        loadingTime: 0.04,
        unloadingTime: 0.03,
        variants: {},
    },
    "SOMMIER DOUBLE": {
        volume: 0.25,
        loadingTime: 0.04,
        unloadingTime: 0.03,
        variants: {},
    },
    "COMMODE": {
        volume: 0.6,
        loadingTime: 0.1,
        unloadingTime: 0.08,
        variants: {},
    },
    "TABLE DE CHEVET": {
        volume: 0.3,
        loadingTime: 0.07,
        unloadingTime: 0.05,
        variants: {},
    },
    "(2 PORTES)": {
        volume: 0.8,
        loadingTime: 0.12,
        unloadingTime: 0.05,
        variants: {
            "ARMOIRE(2 PORTES)": {
                volume: 0.8,
                loadingTime: 0.12,
                unloadingTime: 0.05,
            },
        },
    },
    "(1 PORTE)": {
        volume: 0.3,
        loadingTime: 0.05,
        unloadingTime: 0.03,
        variants: {
            "ARMOIRE(1 PORTE)": {
                volume: 0.3,
                loadingTime: 0.05,
                unloadingTime: 0.03,
            },
        },
    },
    "BERCEAU": {
        volume: 0.4,
        loadingTime: 0.08,
        unloadingTime: 0.05,
        variants: {},
    },
    "CAUSEUSE": {
        volume: 1.0,
        loadingTime: 0.12,
        unloadingTime: 0.06,
        variants: {
            "CAUSEUSE(DIVAN 2 PLACES)": {
                volume: 1.0,
                loadingTime: 0.12,
                unloadingTime: 0.06,
            },
        },
    },
    "CANAPÉ": {
        volume: 1.3,
        loadingTime: 0.15,
        unloadingTime: 0.10,
        variants: {
            "SOFA/CANAPÉ (3PLACES)": {
                volume: 1.3,
                loadingTime: 0.15,
                unloadingTime: 0.10,
            },
        },
    },
    "FAUTEUIL": {
        volume: 0.6,
        loadingTime: 0.1,
        unloadingTime: 0.03,
        variants: {},
    },
    "MEUBLE TÉLÉ": {
        volume: 1.2,
        loadingTime: 0.3,
        unloadingTime: 0.2,
        variants: {
            "GRAND": {
                volume: 1.2,
                loadingTime: 0.3,
                unloadingTime: 0.2,
            },
            "MOYEN": {
                volume: 0.4,
                loadingTime: 0.1,
                unloadingTime: 0.05,
            },
        },
    },

    "TÉLÉVISEUR": {
        variants: {
            "GRAND": {
                volume: 0.5,
                loadingTime: 0.1,
                unloadingTime: 0.05,
            },
            "MOYEN/PETIT": {
                volume: 0.2,
                loadingTime: 0.05,
                unloadingTime: 0.03,
            },
        },
    },
    "TABLE DE CAFÉ, DE BOUT": {
        volume: 0.5,
        loadingTime: 0.05,
        unloadingTime: 0.02,
        variants: {},
    },
    "TABLES À MANGER OU DE TERRASSE": {
        volume: 0.5,
        loadingTime: 0.15,
        unloadingTime: 0.05,
        variants: {},
    },
    "CHAISES": {
        volume: 0.4,
        loadingTime: 0.03,
        unloadingTime: 0.01,
        variants: {},
    },
    "BIBILIOTHEQUE": {
        volume: 0.4,
        loadingTime: 0.03,
        unloadingTime: 0.01,
        variants: {},
    },
    "ARMOIRE DE DOSSIER": {
        volume: 0.5,
        loadingTime: 0.04,
        unloadingTime: 0.03,
        variants: {
            "ARMOIRE DE DOSSIER À TIROIR": {
                volume: 0.5,
                loadingTime: 0.04,
                unloadingTime: 0.03,
            },
        },
    },
    "DESSERTE, HUCHE, CABINETS": {
        volume: 0.5,
        loadingTime: 0.1,
        unloadingTime: 0.08,
        variants: {},
    },
    "MIROIRS - CADRES": {
        volume: 0.1,
        loadingTime: 0.02,
        unloadingTime: 0.01,
        variants: {},
    },
    "GRAND TAPIS": {
        volume: 0.1,
        loadingTime: 0.01,
        unloadingTime: 0.1,
        variants: {},
    },
    "TAPIS": {
        volume: 0.1,
        loadingTime: 0.02,
        unloadingTime: 0.01,
        variants: {},
    },
    "LAMPES ET ABAT-JOURS": {
        volume: 0.2,
        loadingTime: 0.01,
        unloadingTime: 0.01,
        variants: {},
    },
    "COFFRE FORT": {
        variants: {
            "PETIT": {
                volume: 0.4,
                loadingTime: 0.06,
                unloadingTime: 0.03,
            },
            "MOYEN": {
                volume: 0.6,
                loadingTime: 0.6,
                unloadingTime: 0.02,
            },
            "GRAND": {
                volume: 1.2,
                loadingTime: 1.5,
                unloadingTime: 0.5,
            },
        },
    },



    // Add other objects and their variants here
};

// Process input
const result = processInput(inputText, objectConfig);

console.log("ÉTAPE 1 Data:", result.etape1Data);
console.log("ÉTAPE 2 Data:", result.etape2Data);
console.log("ÉTAPE 3 Calculations and Inventory:", result.etape3Data);
console.log("ÉTAPE 4 Calculations and Inventory:", result.etape4Data);
console.log("ÉTAPE 5 Calculations and Inventory:", result.etape5Data);
