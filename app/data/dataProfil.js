let HOST_URL = "https://mmi.unilim.fr/~gader3/SAE2.03-GADER/";
let DataProfil = {};

DataProfil.currentUserId = null;
DataProfil.currentUserName = null;
DataProfil.currentUserImage = null;
DataProfil.currentUserYears = null;

DataProfil.request = async function() {
    let response = await fetch(HOST_URL+"/server/script.php?todo=readusers");
    let data = await response.json();
    return data;
}

DataProfil.selectUser = function(userId, userName) {
    DataProfil.currentUserId = userId;
    DataProfil.currentUserName = userName;
    DataProfil.currentUserImage = userName;
}

export { DataProfil };