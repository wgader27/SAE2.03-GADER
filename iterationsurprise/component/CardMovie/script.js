import { DataProfil } from '../../data/dataProfil.js';

let templateFile = await fetch('./component/CardMovie/template.html');
let template = await templateFile.text();

let CardMovie = {};

CardMovie.format = async function(obj, isInBookmarkPage = false) {
  let html = template;
  let isBookmarked = await DataProfil.isMovieBookmarked(obj.id);

  html = html.replace("{{handler}}", obj.id);


  html = html.replace("{{alt}}", obj.name);
  html = html.replace(/{{id}}/g, obj.id);
  
  if(obj.name.length > 20){
      html = html.replace("{{title}}", obj.name.substring(0, 20) + "...");
  } else {
      html = html.replace("{{title}}", obj.name);
  }

  // Gestion du coeur et de la croix
  html = html.replace("{{heartType}}", isBookmarked ? "fas" : "far");
  
  // Gestion de l'affichage de la croix
  if (isInBookmarkPage) {
      html = html.replace("{{#if isInBookmarkPage}}", "");
      html = html.replace("{{/if}}", "");
  } else {
      // Supprime le bloc entier de la croix si pas dans la page favoris
      html = html.replace(/{{#if isInBookmarkPage}}[\s\S]*?{{\/if}}/g, "");
  }

  let image = obj.image;   
  html = html.replace("{{img}}", image || "no_image.jpg");

  return html;
}

// Modification de formatMany pour prendre en compte le contexte
CardMovie.formatMany = async function(movies, isInBookmarkPage = false) {
  let html = "";
  if (!Array.isArray(movies)) return html;
  for(const movie of movies) {
      html += await CardMovie.format(movie, isInBookmarkPage);
  }
  return html;
}

CardMovie.formatMany = async function(movies, isInBookmarkPage = false) {
  let html = "";
  for(const movie of movies) {
      html += await CardMovie.format(movie, isInBookmarkPage);
  }
  return html;
}

export { CardMovie };