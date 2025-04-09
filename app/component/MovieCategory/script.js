import { CardMovie } from "../CardMovie/script.js";
import { DataMovie } from "../../data/dataMovie.js";

let templateFile = await fetch('./component/MovieCategory/template.html');
let template = await templateFile.text();

let MovieCategory = {};

MovieCategory.format = function (category, movies) {
  let html = template;

  html = html.replace("{{category}}", category);

  let movieHtml = CardMovie.formatMany(movies);
  html = html.replace("{{movies}}", movieHtml);

  return html;
};

MovieCategory.formatMany = async function(categories) {
  let html = "";
  
  for (let category of categories) {
      let movies = await DataMovie.requestMoviesByCategory(category.category);
      if (movies && movies.length > 0) {
          html += MovieCategory.format(category.category, movies);
      }
  }
  
  return html;
}
  

export { MovieCategory };
