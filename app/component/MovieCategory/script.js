import { CardMovie } from "../CardMovie/script.js";
import { DataMovie } from "../../data/dataMovie.js";
import { NoResultCard } from "../NoResultCard/script.js";

let templateFile = await fetch('./component/MovieCategory/template.html');
let template = await templateFile.text();

let MovieCategory = {};

MovieCategory.format = async function(category) {
  let html = template;
  html = html.replace("{{category}}", category.category);

  let movies = await DataMovie.requestMoviesByCategory(category.category);
  
  let movieHtml = await CardMovie.formatMany(movies);
  html = html.replace("{{movies}}", movieHtml);
  return html;
};

MovieCategory.formatMany = async function(categories) {
  let html = "";
  let cpt = 0;
  
  for (let category of categories) {
      let movies = await DataMovie.requestMoviesByCategory(category.category);
      if (movies && movies.length > 0) {
          cpt++;
          html += await MovieCategory.format(category);
      }
  }
  if(cpt === 0) {
    html = NoResultCard.format("Aucun résultat trouvé");
  }
  return html;
}


export { MovieCategory };