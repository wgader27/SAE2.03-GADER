import {DataProfil} from "./dataProfil.js";
// URL où se trouve le répertoire "server" sur mmi.unilim.fr
let HOST_URL = "https://mmi.unilim.fr/~gader3/SAE2.03-GADER";//"http://mmi.unilim.fr/~????"; // CHANGE THIS TO MATCH YOUR CONFIG

let DataMovie = {};

DataMovie.request = async function () {
      let response = await fetch(HOST_URL + "/server/script.php?todo=readmovies");
      let data = await response.json();
      return data;
  };


  DataMovie.requestMovieDetail = async function(id) {
    let response = await fetch(HOST_URL + "/server/script.php?todo=readmoviedetail&id=" + id);
    let data = await response.json();
    return data;
  };

  DataMovie.requestMoviesByCategory = async function(category) {
    const userAge = DataProfil.getUserAge();
    let response = await fetch(HOST_URL+"/server/script.php?todo=readmoviesbycategory&category="+category+"&userAge="+userAge);
    let data = await response.json();
    return data;
}

  DataMovie.requestCategory = async function() {
    let response = await fetch(HOST_URL + "/server/script.php?todo=readcategories");
    let data = await response.json();
    return data;
  }

  DataMovie.getFeaturedMovies = async function() {
    const response = await fetch(HOST_URL + "/server/script.php?todo=getfeatured");
    const data = await response.json();
    return data;
};


DataMovie.search = async function (query) {
  console.log("Recherche envoyée:", query);
  console.log("Recherche envoyée:", encodeURIComponent(query));
  let response = await fetch(HOST_URL + "/server/script.php?todo=search&query=" + encodeURIComponent(query));
  let data = await response.json();
  return data;
};

export {DataMovie};