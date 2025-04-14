let HOST_URL = "https://mmi.unilim.fr/~gader3/SAE2.03-GADER/";
let DataProfil = {};

// Utilisateur par défaut
DataProfil.currentUserId = "guest";
DataProfil.currentUserName = "Invité";
DataProfil.currentUserImage = "Invité";
DataProfil.currentUserBirth = new Date("2000-01-01");

DataProfil.getUserAge = function () {
    const birth = DataProfil.currentUserBirth;
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

DataProfil.request = async function () {
    let response = await fetch(HOST_URL + "/server/script.php?todo=readusers");
    let data = await response.json();
    return data;
}

DataProfil.requestUserById = async function (userId) {
    let response = await fetch(HOST_URL + "/server/script.php?todo=readuserbyid&id=" + userId);
    let data = await response.json();
    return data;
}

DataProfil.selectUser = async function (userId, userName, userImage) {
    if (userId === "guest") {
        DataProfil.currentUserId = "guest";
        DataProfil.currentUserName = "Invité";
        DataProfil.currentUserImage = null;
        DataProfil.currentUserBirth = new Date("2000-01-01");
        return;
    }

    let userDetails = await DataProfil.requestUserById(userId);
    DataProfil.currentUserId = userId;
    DataProfil.currentUserName = userName;
    DataProfil.currentUserImage = userImage || null;
    DataProfil.currentUserBirth = new Date(userDetails.birth);
}

DataProfil.isMovieBookmarked = async function (movieId) {
    if (this.currentUserId === "guest") {
        return false;
    }

    const response = await fetch(HOST_URL + "/server/script.php?todo=isbookmarked&id_user=" + DataProfil.currentUserId + "&id_movie=" + movieId);
        const data = await response.json();
        return data.success;
}


DataProfil.getBookmarks = async function () {
    const id_user = DataProfil.currentUserId;
    const response = await fetch("../server/script.php?todo=getbookmarks&id_user=" + id_user);
    const data = await response.json();
    return data;
}

DataProfil.addBookmark = async function (id_movie) {
    const id_user = DataProfil.currentUserId;
    const response = await fetch("../server/script.php?todo=addbookmark&id_user=" + id_user + "&id_movie=" + id_movie);
    const data = await response.json();
    return data;
}

DataProfil.deleteBookmark = async function (id_movie) {
    const id_user = DataProfil.currentUserId;
    const response = await fetch("../server/script.php?todo=deletebookmark&id_user=" + id_user + "&id_movie=" + id_movie);
    const data = await response.json();
    return data;
}

export { DataProfil };