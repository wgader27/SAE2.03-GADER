import { DataProfil } from '../../data/dataProfil.js';

let templateFile2 = await fetch('./component/FeaturedMovie/featured.html');
let template2 = await templateFile2.text();

let templateFile = await fetch('./component/FeaturedMovie/template.html');
let template = await templateFile.text();

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

FeaturedMovie.initSlider = function() {
    const track = document.querySelector('.carousel__track');
    const slides = document.querySelectorAll('.featured__item');
    const nextButton = document.querySelector('.carousel__button--right');
    const prevButton = document.querySelector('.carousel__button--left');

    if (!track || !slides.length) return;

    let currentIndex = 0;

    function updateSlide() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlide();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlide();
    }

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
};

FeaturedMovie.format = async function(movies) {
    if (!movies || movies.length === 0) {
        return '<p class="featured__empty">Aucun film mis en avant</p>';
    }

    let html = template;
    let moviesHTML = '';
    
    for (const movie of movies) {
        moviesHTML += await FeaturedMovie.formatOne(movie);
    }
    
    html = html.replace('{{movies}}', moviesHTML);

    setTimeout(() => {
        FeaturedMovie.initSlider();
    }, 0);

    return html;
};

export { FeaturedMovie };