let HOST_URL = "https://mmi.unilim.fr/~gader3/SAE2.03-GADER/";//"http://mmi.unilim.fr/~????"; // CHANGE THIS TO MATCH YOUR CONFIG

let DataProfil = {};

DataProfil.request = async function() {
    let response = await fetch(HOST_URL + "/server/script.php?todo=readusers");
    let data = await response.json();
    return data;
}

DataProfil.addUser = async function (fdata) {
     let config = {
        method: "POST", 
        body: fdata
    };
    let answer = await fetch(HOST_URL + "/server/script.php?todo=addUser", config);
    let data = await answer.json();
    return data;
}

DataProfil.updateUser = async function(fdata) {
    let config = {
        method: "POST",
        body: fdata
    };
    let answer = await fetch(HOST_URL + "/server/script.php?todo=updateUser", config);
    let data = await answer.json();
    return data;
}

DataProfil.getUserById = async function(userId) {
    let response = await fetch(HOST_URL + "/server/script.php?todo=readuserbyid&id=" + userId);
    let data = await response.json();
    return data;
}

export { DataProfil };