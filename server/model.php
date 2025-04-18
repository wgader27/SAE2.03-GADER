<?php
/**
 * Ce fichier contient toutes les fonctions qui réalisent des opérations
 * sur la base de données, telles que les requêtes SQL pour insérer,
 * mettre à jour, supprimer ou récupérer des données.
 */

/*
 * Définition des constantes de connexion à la base de données.
 *
 * HOST : Nom d'hôte du serveur de base de données, ici "localhost".
 * DBNAME : Nom de la base de données
 * DBLOGIN : Nom d'utilisateur pour se connecter à la base de données.
 * DBPWD : Mot de passe pour se connecter à la base de données.
 */
define('HOST', 'localhost');
define('DBNAME', 'gader3');
define('DBLOGIN', 'gader3');
define('DBPWD', 'gader3');

function getMovies()
{
    $cnx = new PDO('mysql:host='.HOST.';dbname='.DBNAME, DBLOGIN, DBPWD);
    $sql = 'select * from Movie';
    $stmt = $cnx->prepare($sql);
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);

    return $res;
}

function getMovieDetail($id)
{
    $cnx = new PDO('mysql:host='.HOST.';dbname='.DBNAME, DBLOGIN, DBPWD);
    $sql = 'SELECT Movie.id, Movie.name, Movie.year, Movie.length, Movie.description, Movie.director, 
    Movie.image, Movie.trailer, Movie.min_age, Category.id AS category_id ,Category.name AS category
    FROM Movie JOIN Category ON Movie.id_category = Category.id 
    WHERE Movie.id= :id;';
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    $res = $stmt->fetch(PDO::FETCH_OBJ);

    return $res;
}

function getCategories()
{
    $cnx = new PDO('mysql:host='.HOST.';dbname='.DBNAME, DBLOGIN, DBPWD);
    $sql = 'SELECT id, name AS category FROM Category';
    $stmt = $cnx->prepare($sql);
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);

    return $res;
}

function getMovieByCategory($category, $userAge)
{
    if (empty($category)) {
        return [];
    }
    $cnx = new PDO('mysql:host='.HOST.';dbname='.DBNAME, DBLOGIN, DBPWD);
    $sql = 'SELECT Movie.id, Movie.name, Movie.year, Movie.length, Movie.description, Movie.director, 
            Movie.image, Movie.trailer, Movie.min_age, Category.id AS category_id, Category.name AS category
            FROM Movie 
            JOIN Category ON Movie.id_category = Category.id 
            WHERE Category.name = :category AND Movie.min_age <= :userAge';

    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':category', $category);
    $stmt->bindParam(':userAge', $userAge);
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);

    return $res;
}

function addMovie($name, $year, $length, $description, $director, $id_category, $image, $trailer, $min_age, $featured)
{
    if (empty($name) || empty($year) || empty($length) || empty($description) || empty($director) || empty($id_category) || empty($image) || empty($trailer) || empty($min_age) || empty($featured)) {
        return false;
    }
    $cnx = new PDO('mysql:host='.HOST.';dbname='.DBNAME, DBLOGIN, DBPWD);
    $sql = 'INSERT INTO Movie (name,year,length,description,director,id_category,image,trailer,min_age,featured) 
            VALUES (:name,:year,:length,:description,:director,:id_category,:image,:trailer,:min_age, :featured)';
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':year', $year);
    $stmt->bindParam(':length', $length);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':id_category', $id_category);
    $stmt->bindParam(':image', $image);
    $stmt->bindParam(':trailer', $trailer);
    $stmt->bindParam(':min_age', $min_age);
    $stmt->bindParam(':director', $director);
    $stmt->bindParam(':featured', $featured);
    $stmt->execute();
    $res = $stmt->rowCount();

    return $res;
}

function addUser($name, $image, $birth)
{
    if (empty($name) || empty($image) || empty($birth)) {
        return false;
    }

    $cnx = new PDO('mysql:host='.HOST.';dbname='.DBNAME, DBLOGIN, DBPWD);

    $sql = 'INSERT INTO User (name,image,birth) 
            VALUES (:name,:image,:birth)';

    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':image', $image);
    $stmt->bindParam(':birth', $birth);
    $stmt->execute();
    $res = $stmt->rowCount();

    return $res;
}

function getUserById($id)
{
    $cnx = new PDO('mysql:host='.HOST.';dbname='.DBNAME, DBLOGIN, DBPWD);
    $sql = 'SELECT User.id, User.name, User.image, User.birth
    FROM User 
    WHERE User.id= :id;';
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    $res = $stmt->fetch(PDO::FETCH_OBJ);

    return $res;
}

function getUsers()
{
    $cnx = new PDO('mysql:host='.HOST.';dbname='.DBNAME, DBLOGIN, DBPWD);
    $sql = 'SELECT * FROM User';
    $stmt = $cnx->prepare($sql);
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);

    return $res;
}

function updateUser($id, $name, $image, $birth)
{
    $cnx = new PDO('mysql:host='.HOST.';dbname='.DBNAME, DBLOGIN, DBPWD);
    $sql = 'UPDATE User SET name = :name, image = :image, birth = :birth WHERE id = :id';

    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':image', $image);
    $stmt->bindParam(':birth', $birth);
    $stmt->execute();

    return $stmt->rowCount();
}

// Bookmark
function addBookmark($id_user, $id_movie)
{
    $cnx = new PDO('mysql:host='.HOST.';dbname='.DBNAME, DBLOGIN, DBPWD);

    // Vérifie d'abord si le favori existe
    $check = 'SELECT COUNT(*) FROM Bookmark WHERE id_user = :id_user AND id_movie = :id_movie';
    $stmt = $cnx->prepare($check);
    $stmt->bindParam(':id_user', $id_user);
    $stmt->bindParam(':id_movie', $id_movie);
    $stmt->execute();

    if ($stmt->fetchColumn() > 0) {
        // Le favori existe déjà
        return 0;
    }

    // Si on arrive ici, le favori n'existe pas encore
    $sql = 'INSERT INTO Bookmark (id_user, id_movie) VALUES (:id_user, :id_movie)';
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':id_user', $id_user);
    $stmt->bindParam(':id_movie', $id_movie);
    $stmt->execute();

    return 1;
}

function getBookmarks($id_user)
{
    $cnx = new PDO('mysql:host='.HOST.';dbname='.DBNAME, DBLOGIN, DBPWD);
    $sql = 'SELECT Movie.* FROM Bookmark JOIN Movie ON Bookmark.id_movie = Movie.id WHERE Bookmark.id_user = :id_user';
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':id_user', $id_user);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_OBJ);
}

function isBookmarked($id_user, $id_movie)
{
    $cnx = new PDO('mysql:host='.HOST.';dbname='.DBNAME, DBLOGIN, DBPWD);
    $sql = 'SELECT COUNT(*) as count FROM Bookmark WHERE id_user = :id_user AND id_movie = :id_movie';
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':id_user', $id_user);
    $stmt->bindParam(':id_movie', $id_movie);
    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    return ($result['count'] > 0) ? 1 : 0;
}

function deleteBookmark($id_user, $id_movie)
{
    $cnx = new PDO('mysql:host='.HOST.';dbname='.DBNAME, DBLOGIN, DBPWD);
    $sql = 'DELETE FROM Bookmark WHERE id_user = :id_user AND id_movie = :id_movie';
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':id_user', $id_user);
    $stmt->bindParam(':id_movie', $id_movie);
    $stmt->execute();

    return true;
}

function getFeaturedMovies()
{
    try {
        $cnx = new PDO('mysql:host='.HOST.';dbname='.DBNAME, DBLOGIN, DBPWD);
        $sql = 'SELECT * FROM Movie WHERE featured = 1 ORDER BY id DESC;';
        $stmt = $cnx->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        return [];
    }
}

function searchMovies($query)
{
    $query = trim($query);
    $cnx = new PDO('mysql:host='.HOST.';dbname='.DBNAME, DBLOGIN, DBPWD);
    $sql = 'SELECT * FROM Movie WHERE LOWER(name) LIKE LOWER(:query)';
    $stmt = $cnx->prepare($sql);
    $like = "%$query%";
    $stmt->bindParam(':query', $like);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_OBJ);
}
