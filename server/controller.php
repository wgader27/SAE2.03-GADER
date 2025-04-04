<?php

/** ARCHITECTURE PHP SERVEUR  : Rôle du fichier controller.php
 * 
 *  Dans ce fichier, on va définir les fonctions de contrôle qui vont traiter les requêtes HTTP.
 *  Les requêtes HTTP sont interprétées selon la valeur du paramètre 'todo' de la requête (voir script.php)
 *  Pour chaque valeur différente, on déclarera une fonction de contrôle différente.
 * 
 *  Les fonctions de contrôle vont éventuellement lire les paramètres additionnels de la requête, 
 *  les vérifier, puis appeler les fonctions du modèle (model.php) pour effectuer les opérations
 *  nécessaires sur la base de données.
 *  
 *  Si la fonction échoue à traiter la requête, elle retourne false (mauvais paramètres, erreur de connexion à la BDD, etc.)
 *  Sinon elle retourne le résultat de l'opération (des données ou un message) à includre dans la réponse HTTP.
 */

/** Inclusion du fichier model.php
 *  Pour pouvoir utiliser les fonctions qui y sont déclarées et qui permettent
 *  de faire des opérations sur les données stockées en base de données.
 */
require("model.php");

function readController(){
    
    $menu = getMovies();
    return $menu;
}



function addController() {
  // Vérifiez que tous les paramètres sont présents
  $list_params = ['name', 'year', 'length', 'description', 'director', 'id_category', 'image', 'trailer', 'min_age'];
  foreach ($list_params as $param) {
      if (!isset($_REQUEST[$param])) {
          error_log("Paramètre manquant: $param");
          return false;
      }
  }

  // Récupérez les paramètres
  $name = $_REQUEST['name'];
  $year = $_REQUEST['year'];
  $length = $_REQUEST['length'];
  $description = $_REQUEST['description'];
  $director = $_REQUEST['director'];
  $id_category = $_REQUEST['id_category'];
  $image = $_REQUEST['image'];
  $trailer = $_REQUEST['trailer'];
  $min_age = $_REQUEST['min_age'];

  // Appel de la fonction addMovie
  $ok = addMovie($name, $year, $length, $description, $director, $id_category, $image, $trailer, $min_age);

  if ($ok != 0) {
      return "Le film $name a été ajouté";
  } else {
      error_log("addMovie() failed");
      return false;
  }
}

