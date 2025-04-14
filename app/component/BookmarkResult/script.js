import { CardMovie } from "../CardMovie/script.js";

let templateFile = await fetch('./component/BookmarkResult/template.html');
let template = await templateFile.text();

let BookmarkResult = {};

BookmarkResult.format = async function (movies) {
    let html = template;
    let movieHtml = await CardMovie.formatMany(movies, true);
    html = html.replace("{{movies}}", movieHtml);
    return html;
};


export { BookmarkResult };