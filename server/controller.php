<?php

/** ARCHITECTURE PHP SERVEUR  : Rôle du fichier controller.php.
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
require 'model.php';

function readMovieController()
{
    $menu = getMovies();

    return $menu;
}

function readMovieDetailController()
{
    $id = $_REQUEST['id'];

    $movie = getMovieDetail($id);

    if ($movie != 0) {
        return $movie;
    } else {
        return "Erreur lors de la récupération du film avec l'ID $id";
    }
}

function readCategoriesController()
{
    $categories = getCategories();

    if ($categories != 0) {
        return $categories;
    } else {
        return 'Erreur lors de la récupération des catégories';
    }
}

function readMovieByCategoryController()
{
    $category = $_REQUEST['category'];
    $userAge = isset($_REQUEST['userAge']) ? intval($_REQUEST['userAge']) : 99; // 99 ans par défaut pour l'invité

    $movies = getMovieByCategory($category, $userAge);

    return $movies;
}

function addMovieController()
{
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
        return "Erreur lors de l'ajout du film $name<br>champs vides ou erreur de connexion à la BDD";
    }
}

function addUserController()
{
    // Récupérez les paramètres
    $name = $_REQUEST['name'];
    $image = $_REQUEST['image'];
    $birth = $_REQUEST['birth'];

    // Appel de la fonction addUser
    $ok = addUser($name, $image, $birth);
    if ($ok != 0) {
        return "L'utilisateur $name a été ajouté";
    } else {
        return "Erreur lors de l'ajout de l'utilisateur $name<br>champs vides ou erreur de connexion à la BDD";
    }
}

function updateUserController()
{
    $id = $_REQUEST['id'];
    $name = $_REQUEST['name'];
    $image = $_REQUEST['image'];
    $birth = $_REQUEST['birth'];

    $ok = updateUser($id, $name, $image, $birth);
    if ($ok != 0) {
        return "L'utilisateur $name a été modifié";
    } else {
        return "Erreur lors de la modification de l'utilisateur $name";
    }
}

function readUserDetailController()
{
    $id = $_REQUEST['id'];
    $user = getUserById($id);

    if ($user != 0) {
        return $user;
    } else {
        return "Erreur lors de la récupération de l'utilisateur avec l'ID $id";
    }
}
function readUsersController()
{
    $users = getUsers();

    if ($users != 0) {
        return $users;
    } else {
        return 'Erreur lors de la récupération des utilisateurs';
    }
}

// Bookmarks

function getBookmarksController()
{
    $id_user = $_REQUEST['id_user'];

    // Appel à DataProfil pour récupérer les favoris
    $bookmarks = getBookmarks($id_user);

    // Si aucun favori n'est trouvé, retournez un message approprié
    if (empty($bookmarks)) {
        return ['message' => 'Aucun film favori pour ce profil'];
    }

    return $bookmarks;
}

function isBookmarkedController()
{
    $user = $_REQUEST['id_user'] ?? null;
    $movie = $_REQUEST['id_movie'] ?? null;

    if (empty($user) || empty($movie)) {
        return ['success' => false, 'message' => 'Erreur : Tous les champs doivent être remplis.'];
    }

    $result = isBookmarked($user, $movie);

    if ($result === 1) {
        return ['success' => true, 'message' => 'Film déjà dans les favoris'];
    } else {
        return ['success' => false, 'message' => 'Film non trouvé dans les favoris'];
    }
}

function addBookmarkController()
{
    $user = $_REQUEST['id_user'];
    $movie = $_REQUEST['id_movie'];

    if (empty($user) || empty($movie)) {
        return ['success' => false, 'message' => 'Erreur : Tous les champs doivent être remplis.'];
    }

    $result = addBookmark($user, $movie);

    if ($result === 1) {
        return ['success' => true, 'message' => 'Film ajouté aux favoris'];
    } else {
        return ['success' => false, 'message' => 'Film déjà dans les favoris'];
    }
}

function deleteBookmarkController()
{
    $user = $_REQUEST['id_user'];
    $movie = $_REQUEST['id_movie'];

    if (empty($user) || empty($movie)) {
        return ['success' => false, 'message' => 'Paramètres manquants'];
    }

    $result = deleteBookmark($user, $movie);

    if ($result) {
        return ['success' => true, 'message' => 'Film supprimé des favoris'];
    } else {
        return ['success' => false, 'message' => 'Erreur lors de la suppression'];
    }
}

function getFeaturedMoviesController()
{
    $movies = getFeaturedMovies();
    if (empty($movies)) {
        return ['message' => 'Aucun film mis en avant'];
    }

    return $movies;
}
