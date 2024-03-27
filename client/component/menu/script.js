/*  Composant Menu */

/* on importe la fonction loadTemplate depuis le module /js/loader.js */
import { loadTemplate } from '../../js/utils.js';

/* on charge le template du composant Menu */
let template = await loadTemplate('./component/menu/template.html');

/* on crée un objet Menu vide qui va symboliser notre composant */
let Menu = {}; 

/*  Menu.format
    @param obj: object, un objet JS contenant les données à injecter dans le template
    @return string, le template HTML formaté avec les données de l'objet
*/
Menu.format =  function(obj) {
    let html = template;
    html = html.replace('{{entree}}', obj.entree);
    html = html.replace('{{plat}}', obj.plat);
    html = html.replace('{{dessert}}', obj.dessert);
    return html;
}

/*  Menu.render
    @param selector: string, un sélecteur CSS pour cibler l'élément de la page où injecter le composant une fois formaté
    @param data: array, le chemin vers le fichier JSON contenant les données à injecter dans le template pour un
    ou plusieurs composant Hero (voir le fichier data/hero.json)

    Note : pour async et await, voir les explications dans le fichier js/loader.js

    Note bis : Menu.render est donc capable d'afficher plusieurs composants Menu d'un coup si on lui fournit un tableau
    d'objets, chaque objet contenant les données à injecter dans le template pour un composant Hero. C'est similaire à la
    fonction renderRecipes de l'exercice 6 sur les recettes de cuisine. Si j'ai besoin de rendre plusieurs composants Hero,
    et bien c'est possible. Et si je ne veux en afficher qu'un, c'est possible aussi, il suffira de fournir un tableau avec 
    un seil objet de données Hero dedans. C'est plus flexible ainsi.
*/
Menu.render = async function(selector, data){
    
    // on formate un composant Menu pour chaque objet du tableau
    let html = '';
    for(let obj of data){
        html += Menu.format(obj); // on concatène (mettre bout à bout) les HTML des composants formatés  
    }
    
    // on injecte le HTML dans le DOM
    let where = document.querySelector(selector); // on cible l'élément où injecter le HTML
    where.innerHTML =  html; // on ajoute le HTML à la fin du contenu de l'élément ciblé par le sélecteur
}

// on exporte le composant Menu pour pouvoir l'utiliser ailleurs dans un autre modules JS
export {Menu}

// Note : seul Menu est exporté (et donc Menu.render et Menu.format)
// La variable template n'est pas exportée, elle n'est donc pas accessible depuis l'extérieur (et c'est tant mieux)