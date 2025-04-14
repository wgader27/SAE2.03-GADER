import { DataProfil } from "../../data/dataProfil";
// import { CommentSection } from '../CommentSection/script.js';

let templateFile = await fetch('./component/MovieDetail/template.html');
let template = await templateFile.text();

let MovieDetail = {};

MovieDetail.format = function (movie) {
  let html = template;
  html = html.replace('{{title}}', movie.name);
  html = html.replace('{{alt}}', movie.name);
  html = html.replace("{{img}}", movie.image);
  html = html.replace("{{duration}}", movie.length+" minutes");
  html = html.replace("{{views}}", "15 000");
  html = html.replace("{{director}}", movie.director);
  html = html.replace("{{year}}", movie.year);
  html = html.replace("{{category}}", movie.category);
  if(movie.min_age == 0){
    html = html.replace("{{min_age}}", "Tous publics");
  }
  html = html.replace("{{min_age}}", "+ "+movie.min_age);
  html = html.replace("{{description}}", movie.description);

  // Format YouTube URL for embed
  let trailer = movie.trailer;
  if (trailer.includes("watch?v=")) {
    trailer = trailer.replace("watch?v=", "embed/");
  }
  html = html.replace("{{trailer}}", trailer);

  // const comments = await C.getMovieComments(movie.id);
  // const commentSection = await CommentSection.format(comments, movie.id);
  // html = html.replace('{{comments}}', commentSection);


  return html;
};

export { MovieDetail };
