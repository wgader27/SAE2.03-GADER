let HOST_URL = "https://mmi.unilim.fr/~gader3/SAE2.03-GADER/";//"http://mmi.unilim.fr/~????"; // CHANGE THIS TO MATCH YOUR CONFIG

let DataProfil = {};

DataProfil.addUser = async function (fdata) {
    // fetch possède un deuxième paramètre (optionnel) qui est un objet de configuration de la requête HTTP:
    //  - method : la méthode HTTP à utiliser (GET, POST...)
    //  - body : les données à envoyer au serveur (sous forme d'objet FormData ou bien d'une chaîne de caractères, par exempe JSON)
    let config = {
        method: "POST", // méthode HTTP à utiliser
        body: fdata // données à envoyer sous forme d'objet FormData
    };
    let answer = await fetch(HOST_URL + "/server/script.php?todo=addUser", config);
    let data = await answer.json();
    return data;
}

export { DataProfil };