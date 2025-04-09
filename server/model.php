<?php
/**
 * Ce fichier contient toutes les fonctions qui réalisent des opérations
 * sur la base de données, telles que les requêtes SQL pour insérer, 
 * mettre à jour, supprimer ou récupérer des données.
 */

/**
 * Définition des constantes de connexion à la base de données.
 *
 * HOST : Nom d'hôte du serveur de base de données, ici "localhost".
 * DBNAME : Nom de la base de données
 * DBLOGIN : Nom d'utilisateur pour se connecter à la base de données.
 * DBPWD : Mot de passe pour se connecter à la base de données.
 */
define("HOST", "localhost");
define("DBNAME", "gader3");
define("DBLOGIN", "gader3");
define("DBPWD", "gader3");



/**
 * Récupère le film  dans la base de données.
 *
 * @return array 
 */
function getMovies(){
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    $sql = "select * from Movie";
    $stmt = $cnx->prepare($sql);
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res; 
}


function getMovieDetail($id){
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD); 
    // Requête SQL de mise à jour du menu avec des paramètres
    $sql = "SELECT Movie.id, Movie.name, Movie.year, Movie.length, Movie.description, Movie.director, 
    Movie.image, Movie.trailer, Movie.min_age, Category.id AS category_id ,Category.name AS category
    FROM Movie JOIN Category ON Movie.id_category = Category.id 
    WHERE Movie.id= :id;";
    // Prépare la requête SQL
    $stmt = $cnx->prepare($sql);
    // Lie les paramètres aux valeurs
    $stmt->bindParam(':id', $id);
    // Exécute la requête SQL
    $stmt->execute();
    // Récupère le résultat
    $res = $stmt->fetch(PDO::FETCH_OBJ); 
    return $res; // Retourne le résultat
}


function getCategories(){
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    $sql = "SELECT id, name AS category FROM Category";
    $stmt = $cnx->prepare($sql);
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res; 
}

function getMovieByCategory($category){
    if (empty($category)) {
        return [];
    }
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    $sql = "SELECT Movie.id, Movie.name, Movie.year, Movie.length, Movie.description, Movie.director, 
            Movie.image, Movie.trailer, Movie.min_age, Category.id AS category_id ,Category.name AS category
            FROM Movie JOIN Category ON Movie.id_category = Category.id 
            WHERE Category.name = :category;";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':category', $category);
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res; 
}


function addMovie($name, $year, $length, $description, $director, $id_category, $image, $trailer, $min_age){
    // Vérification des paramètres
    if (empty($name) || empty($year) || empty($length) || empty($description) || empty($director) || empty($id_category) || empty($image) || empty($trailer) || empty($min_age)) {
        return false; // Paramètres manquants
    }
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD); 
    // Requête SQL de mise à jour du menu avec des paramètres
    $sql = "INSERT INTO Movie (name,year,length,description,director,id_category,image,trailer,min_age) 
            VALUES (:name,:year,:length,:description,:director,:id_category,:image,:trailer,:min_age)";
    // Prépare la requête SQL
    $stmt = $cnx->prepare($sql);
    // Lie les paramètres aux valeurs
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':year', $year);
    $stmt->bindParam(':length', $length);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':id_category', $id_category);
    $stmt->bindParam(':image', $image);
    $stmt->bindParam(':trailer', $trailer);
    $stmt->bindParam(':min_age', $min_age);
    $stmt->bindParam(':director', $director);
    // Exécute la requête SQL
    $stmt->execute();
    // Récupère le nombre de lignes affectées par la requête
    $res = $stmt->rowCount(); 
    return $res; // Retourne le nombre de lignes affectées
}


function addUser($name, $image, $birth){
    if (empty($name) || empty($image) || empty($birth)) {
        return false; 
    }

    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD); 

    $sql = "INSERT INTO User (name,image,birth) 
            VALUES (:name,:image,:birth)";

    $stmt = $cnx->prepare($sql);
    // Lie les paramètres aux valeurs
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':image', $image);
    $stmt->bindParam(':birth', $birth);
    // Exécute la requête SQL
    $stmt->execute();
    // Récupère le nombre de lignes affectées par la requête
    $res = $stmt->rowCount(); 
    return $res; // Retourne le nombre de lignes affectées
}

function getUserById($id){
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD); 
    $sql = "SELECT User.id, User.name, User.image, User.birth
    FROM User 
    WHERE User.id= :id;";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    $res = $stmt->fetch(PDO::FETCH_OBJ); 
    return $res;
}

function getUsers(){
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    $sql = "SELECT * FROM User";
    $stmt = $cnx->prepare($sql);
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res; 
}