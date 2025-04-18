import { DataProfil } from '../../data/dataProfil.js';
import { NoResultCard } from '../NoResultCard/script.js'; 

let templateFile = await fetch('./component/FeaturedMovie/template.html');
let template = await templateFile.text();

let templateFile2 = await fetch('./component/FeaturedMovie/featured.html');
let template2 = await templateFile2.text();


let FeaturedMovie = {};

FeaturedMovie.formatOne = async function(movie) {
    let html = template2;
    const isBookmarked = await DataProfil.isMovieBookmarked(movie.id);
    const imagePath = movie.image || 'no_image.jpg';

    html = html.replace(/\{\{id\}\}/g, movie.id);
    html = html.replace(/\{\{image\}\}/g, imagePath);
    html = html.replace(/\{\{title\}\}/g, movie.name);
    html = html.replace(/\{\{description\}\}/g, movie.description?.substring(0, 150) + '...');
    html = html.replace(/\{\{heartType\}\}/g, isBookmarked ? 'fas' : 'far');
    html = html.replace(/\{\{favorite-class\}\}/g, isBookmarked ? 'is-favorite' : '');

    return html;
};

FeaturedMovie.format = async function(movies) {
    let html = template;
    if (!Array.isArray(movies) || movies.length === 0) {
        return NoResultCard.format("Aucun film mis en avant");
    }

    let moviesHTML = '';
    for (const movie of movies) {
        moviesHTML += await FeaturedMovie.formatOne(movie);
    }
    return html.replace('{{movies}}', moviesHTML);
};

export { FeaturedMovie };