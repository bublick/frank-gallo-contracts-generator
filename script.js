// script.js
// const objectConfig = {
//     "RÉFRIGÉRATEUR": { 
//         removeLength: 14, 
//         volume: 1, 
//         loadingTime: 0.15, 
//         unloadingTime: 0.1,
//         variants: {
//             "GRAND": { volume: 1.3, loadingTime: 0.2, unloadingTime: 0.15 },
//             "PETIT": { volume: 0.5, loadingTime: 0.15, unloadingTime: 0.1 }
//         }
//     },
//     "GROS CONGÉLATEUR": { 
//         removeLength: 17, 
//         volume: 1, 
//         loadingTime: 0.15, 
//         unloadingTime: 0.12 
//     },
//     "CONGÉLATEUR MOYEN": { 
//         removeLength: 18, 
//         volume: 0.6, 
//         loadingTime: 0.1, 
//         unloadingTime: 0.08 
//     },
//     "CUISINIÈRES - FOUR/POÊLE": { 
//         removeLength: 25, 
//         volume: 0.6, 
//         loadingTime: 0.1, 
//         unloadingTime: 0.08 
//     },
//     "LAVE VAISSELLE": { 
//         removeLength: 15, 
//         volume: 0.4, 
//         loadingTime: 0.1, 
//         unloadingTime: 0.07 
//     }
// };


function importFromText() {
    const importText = document.getElementById("importTextArea").value;
    const s_Lines = importText.split('\n').map(line => line.trim()); // Split into lines and trim
    const inventoryContainer = document.getElementById("inventoryContainer");
    let n_Line = 0;

    while (n_Line < s_Lines.length) {
        const line = s_Lines[n_Line];



        n_Line++;
    }

    function addInventoryItem() {
        const itemHTML = `
            <div>
                <input type="text" placeholder="Item Name">
                <input type="number" placeholder="Quantity">
            </div>`;
        inventoryContainer.insertAdjacentHTML('beforeend', itemHTML);
    }
}


// function importFromText() {
//     const importText = document.getElementById("importTextArea").value;

//     // Regex patterns
//     const clientInfoRegex = /NOM ET PRÉNOM\s*(.*?)\s*TITRE\s*(.*?)\s*COURRIEL\s*(.*?)\s*TÉLÉPHONE\s*(\d+)/;
//     const movingInfoRegex = /DATE\s*(\d{4}-\d{2}-\d{2})\s*DATE FLEXIBLE \?\s*(.*?)\s*ADRESSE DE DÉPART \+ VILLE\s*(.*?)\s*ÉTAGE ADRESSE DE DÉPART\s*(.*?)\s*ADRESSE DESTINATION \+ VILLE\s*(.*?)\s*ÉTAGE ADRESSE DE DESTINATION\s*(.*?)\s*/;
    
//     // Regex to capture any "ÉTAPE" section with its items, excluding "PLUS DE PRÉCISIONS"
//     const stepRegex = /ÉTAPE\s*\d+\s*-\s*([\s\S]*?)(?=ÉTAPE\s*\d+|PLUS DE PRÉCISIONS|$)/g;
    
//     // Regex to capture "PLUS DE PRÉCISIONS" details
//     const moreDetailsRegex = /PLUS DE PRÉCISIONS\s*([\s\S]*?)$/;

//     // Match client information
//     const clientMatch = importText.match(clientInfoRegex);
//     if (clientMatch) {
//         document.getElementById("s_client_name").value = clientMatch[1];
//         document.getElementById("s_client_phn_number").value = clientMatch[4];
//     }

//     // Match moving information
//     const movingMatch = importText.match(movingInfoRegex);
//     if (movingMatch) {
//         document.getElementById("s_moving_date").value = movingMatch[1];
//         document.getElementById("flexible_date_comment").value = movingMatch[2];
//         document.getElementById("textBox_Starting_address").value = movingMatch[3];
//         document.getElementById("textBox_Starting_address_floor").value = movingMatch[4];
//         document.getElementById("textBox_Destination_address").value = movingMatch[5];
//         document.getElementById("textBox_Destination_address_floor").value = movingMatch[6];
//     }

//     // Capture and set "PLUS DE PRÉCISIONS" in the "More Details" field
//     const moreDetailsMatch = importText.match(moreDetailsRegex);
//     if (moreDetailsMatch) {
//         document.getElementById("textBox_MoreDetails").value = moreDetailsMatch[1].trim();
//     }

//     // Clear existing inventory items
//     const container = document.getElementById("inventoryContainer");
//     container.innerHTML = '';

//     // Loop through each "ÉTAPE" section and add items to inventory
//     let stepMatch;
//     while ((stepMatch = stepRegex.exec(importText)) !== null) {
//         const itemsText = stepMatch[1];
        
//         // Regex for individual item names and quantities
//         const itemRegex = /^([A-ZÀ-Ÿ\s\-()\/]+)\s*(\d+|Non|Moyen)?$/gm;
        
//         let itemMatch;
//         while ((itemMatch = itemRegex.exec(itemsText)) !== null) {
//             const itemName = itemMatch[1].trim();
//             const itemQuantity = itemMatch[2] ? itemMatch[2].trim() : '0';

//             // Add a new inventory item to the container
//             addInventoryItem();
            
//             // Set the name and quantity for the last added item
//             const itemDiv = container.lastElementChild;
//             itemDiv.querySelector("input[type='text']").value = itemName;
//             itemDiv.querySelector("input[type='number']").value = isNaN(parseInt(itemQuantity)) ? '0' : itemQuantity;
//         }
//     }
// }

function addInventoryItem() {
    const container = document.getElementById("inventoryContainer");
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("inventory-item", "mb-2");

    const itemName = document.createElement("input");
    itemName.type = "text";
    itemName.placeholder = "Nom de l'article / Item Name";
    itemName.classList.add("w-full", "px-3", "py-2", "border", "rounded-lg");

    const itemQuantity = document.createElement("input");
    itemQuantity.type = "number";
    itemQuantity.placeholder = "Quantité / Quantity";
    itemQuantity.classList.add("w-full", "px-3", "py-2", "border", "rounded-lg");

    itemDiv.appendChild(itemName);
    itemDiv.appendChild(itemQuantity);
    container.appendChild(itemDiv);
}

function generateContract() {
    const s_client_name = document.getElementById("s_client_name").value;
    const s_client_phn_number = document.getElementById("s_client_phn_number").value;
    const flexible_date = document.getElementById("flexible_date").checked;
    const flexible_date_comment = document.getElementById("flexible_date_comment").value;
    const s_moving_date = document.getElementById("s_moving_date").value;
    const s_moving_time = (document.getElementById("s_moving_time_hours").value < 10 ? "0" : "") + document.getElementById("s_moving_time_hours").value + ":" + (document.getElementById("s_moving_time_minutes").value < 10 ? "0" : "") + document.getElementById("s_moving_time_minutes").value;
    const s_moving_date2 = document.getElementById("s_moving_date2").value;
    const s_moving_time2 = (document.getElementById("s_moving_time2_hours").value < 10 ? "0" : "") + document.getElementById("s_moving_time2_hours").value + ":" + (document.getElementById("s_moving_time2_minutes").value < 10 ? "0" : "") + document.getElementById("s_moving_time2_minutes").value;
    const s_moving_date3 = document.getElementById("s_moving_date3").value;
    const s_moving_time3 = (document.getElementById("s_moving_time3_hours").value < 10 ? "0" : "") + document.getElementById("s_moving_time3_hours").value + ":" + (document.getElementById("s_moving_time3_minutes").value < 10 ? "0" : "") + document.getElementById("s_moving_time3_minutes").value;
    const textBox_Starting_address = document.getElementById("textBox_Starting_address").value;
    const textBox_Starting_address_floor = document.getElementById("textBox_Starting_address_floor").value;
    const textBox_Destination_address = document.getElementById("textBox_Destination_address").value;
    const textBox_Destination_address_floor = document.getElementById("textBox_Destination_address_floor").value;
    const dnb_of_trucks = document.getElementById("dnb_of_trucks").value;
    const dHourly_rate = document.getElementById("dHourly_rate").value;
    const dheures = document.getElementById("dheures").value;
    const nPlastic_bags = document.getElementById("nPlastic_bags").value;
    const nWardrobe_boxes = document.getElementById("nWardrobe_boxes").value;
    const dDistance = document.getElementById("dDistance").value;

    const moversSelection = document.querySelector("input[name='professionalMovers']:checked").value;
    let inventory = "";
    document.querySelectorAll(".inventory-item").forEach(item => {
        const name = item.children[0].value;
        const quantity = item.children[1].value;
        inventory += `<li>${name} - Quantité / Quantity: ${quantity}</li>`;
    });

    const moreDetails = document.getElementById("textBox_MoreDetails").value;

    const contractHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Contrat</title>
    <style>
        body { font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f7f7f7; }
        .header { text-align: center; margin-bottom: 20px; }
        .header svg { width: 100px; height: 100px; margin-bottom: 10px; }
        .header h1 { color: #E34234; font-size: 24px; font-weight: bold; }
        .content { padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        .section { margin-bottom: 20px; }
        .section h2 { font-size: 18px; color: #E34234; margin-bottom: 10px; }
        .section p, .section ul { font-size: 14px; line-height: 1.5; }
        .section ul { margin-left: 20px; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #777; }
        .footer p { margin-bottom: 5px; }
    </style>
</head>
<body>
    <div class="header">
        <!-- Updated SVG Logo -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="#E34234" />
            <text x="50" y="55" font-size="18" fill="white" text-anchor="middle" font-family="Arial">LOGO</text>
        </svg>
        <h1>Contrat de Déménagement / Moving Contract</h1>
    </div>
    <div class="content">
        <div class="section">
            <h2>Détails du Client / Client Details</h2>
            <p>Nom / Name: ${s_client_name}<br>Téléphone / Phone: ${s_client_phn_number}</p>
        </div>

        <!-- Hide this section if no moving date is provided -->
        ${s_moving_date || s_moving_date2 || s_moving_date3 ? `
        <div class="section">
            <h2>Date de Déménagement / Moving Date</h2>
            <p>Flexible: ${flexible_date ? "Oui" : "Non"}<br>
            ${flexible_date && flexible_date_comment ? `, ${flexible_date_comment}` : ""}</p>
            <ul>
                ${s_moving_date ? `<li>${s_moving_date} ${s_moving_time}</li>` : ""}
                ${s_moving_date2 ? `<li>${s_moving_date2} ${s_moving_time2}</li>` : ""}
                ${s_moving_date3 ? `<li>${s_moving_date3} ${s_moving_time3}</li>` : ""}
            </ul>
        </div>
        ` : ""}

        <div class="section">
            <h2>Adresse de Déménagement / Moving Address</h2>
            <p>Départ / Start: ${textBox_Starting_address}, Étage / Floor: ${textBox_Starting_address_floor}<br>
            Destination: ${textBox_Destination_address}, Étage / Floor: ${textBox_Destination_address_floor}</p>
        </div>

        <div class="section">
            <h2>Détails du Service / Service Details</h2>
            <p>Nombre de Camions / Number of Trucks: ${dnb_of_trucks}<br>
            Déménageurs Professionnels / Movers: ${moversSelection}<br>
            Taux Horaire / Hourly Rate: ${dHourly_rate}$<br>
            Heures Estimées / Estimated Hours: ${dheures}h</p>
        </div>

        <div class="section">
            <h2>Risque de Débordement / Overflow Risk</h2>
            <p>(!) Risque de débordement.</p>
            <p>Moving Estimator Pro 3.7 estime votre déménagement comme suit :</p>
            <ul>
                <li>${document.getElementById("textBox_InitialTimeContract").value}h Déplacement initial/Camion/Assur et retour après le travail</li>
                <li>${document.getElementById("textBox_loadingTimeContract").value}h Protection des meubles et chargement</li>
                <li>${document.getElementById("textBox_DriveTimeContract").value}h de route (conditions normales, pas de congestion ni tempête)</li>
                <li>${document.getElementById("textBox_UnloadingTimeContract").value}h Déchargement + facturation + paiement</li>
            </ul>
        </div>

        <p>Total heures estimées / Estimated Total Hours: ${dheures}h x ${dHourly_rate}$/h (minimum ${Math.ceil(dheures)}h)</p>

        <div class="section">
            <h3>Les pourboires sont à votre discrétion et appréciation / Tips at your discretion and appreciation.</h3>
            <p>Les housses à matelas / Mattress covers (${nPlastic_bags}) et les boîtes garde-robes / Wardrobe boxes (${nWardrobe_boxes}) sont incluses dans le prix.<br>
            Distance totale parcourue / Total distance covered (${dDistance} km): les frais Diesel sont inclus dans le prix.<br>
            Taux horaire ajusté / Adjusted hourly rate: ${Math.round(dDistance * dHourly_rate / dheures, 1) + dHourly_rate}$</p>
        </div>

        <div class="section">
            <h2>Inventaire / Inventory</h2>
            <ul>${inventory}</ul>
        </div>

        ${moreDetails ?? `
        <div class="section">
            <h2>Plus de Détails / More Details</h2>
            <p>${moreDetails}</p>
        </div>
        `}

        <h3>CETTE OFFRE EXPIRE DANS 48H / THIS OFFER EXPIRES IN 48H</h3>
        <p>Pour accepter notre offre un acompte de ${dHourly_rate} est requis.<br>
        L’acompte est payable par (Transfert) à info@menard.con. Ou encore par carte de crédit sur moi.<br>
        L’acompte sera soustrait du total de votre facture et est non remboursable en cas d’annulation.</p>

        <p>En acceptant nos services ou en payant l’acompte, le client reconnait avoir lu et compris les termes et conditions.</p>

        <div class="section">
            <h2>TERMES ET CONDITIONS</h2>
            <p>Nous comptons sur votre bonne préparation : boîtes fermées, stationnements réservés, respect de l’inventaire, etc.</p>
            <p>À moins d’une entente préalable à prix fixe, cette estimation est à titre indicatif uniquement, c’est une facturation horaire.</p>
            <p>De nombreux facteurs peuvent affecter le temps de service, notamment la distance à marcher, les portes à démonter, le nombre d’étages et la présence d’un ascenseur, etc.</p>
            <p>Le calculateur n’inclut pas le temps d’assemblage/désassemblage de meubles ; nos déménageurs peuvent le faire pour la plupart des modèles si nécessaire.</p>
            <ol>
                <li>Vérification : VÉRIFIEZ LES INFORMATIONS DE LA FICHE DE RÉSERVATION, NOTAMMENT L’INVENTAIRE, les adresses et # d’appartement, ainsi que la présence d’un # de téléphone où vous serez joignable.</li>
                <li>Alcool, armes à feu, bijoux et chocolat : Nous ne transportons pas ces articles. Transportez-les vous-même ou emballez-les correctement.</li>
                <li>Modification d’inventaire : Tout changement significatif doit être signalé une semaine à l’avance.</li>
                <li>Heure d’arrivée : Le client doit être disponible dans les 30 minutes suivant notre appel ; le temps d’attente sera facturé ou le déménagement pourrait être annulé.</li>
                <li>Stationnement : Réservez un espace pour le camion à l’origine et à la destination la veille du déménagement.</li>
                <li>Facturation : Par tranches de 15 minutes, avec un minimum de 1 heure pour le déplacement initial et de 2 heures pour le service.</li>
                <li>Résiliation du contrat : Nous pouvons annuler en cas de vermine, de malpropreté excessive, ou d’accès non sécuritaires.</li>
                <li>Palantage : Passer un meuble par une fenêtre est facturé comme un extra.</li>
                <li>Poids maximal : Les meubles de plus de 140 kg doivent être mentionnés à l’avance et sont facturés en extra (ex. pianos, coffres forts).</li>
                <li>Paiement : Comptant, transfert Interac, ou carte de crédit avec frais de 3,5 % ; les taxes sont en sus.</li>
                <li>Droit de rétention : Nous pouvons retenir les biens jusqu’au paiement complet des frais de transport.</li>
                <li>Obligation de remboursement : Le client doit être présent à la livraison. Sinon, un remboursement sera effectué pour le temps perdu.</li>
            </ol>
        </div>
    </div>
    <div class="footer">
        <p>Contactez-nous : info@menard.con / Tel : 123-456-7890</p>
    </div>
</body>
</html>

    `;

    const blob = new Blob([contractHtml], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Contrat.html";
    link.click();
}
