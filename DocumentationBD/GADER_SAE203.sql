-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : ven. 18 avr. 2025 à 17:13
-- Version du serveur : 8.0.41-0ubuntu0.22.04.1
-- Version de PHP : 8.1.2-1ubuntu2.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `SAE203`
--

-- --------------------------------------------------------

--
-- Structure de la table `Bookmark`
--

CREATE TABLE `Bookmark` (
  `id_user` int NOT NULL,
  `id_movie` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Bookmark`
--

INSERT INTO `Bookmark` (`id_user`, `id_movie`) VALUES
(10, 17),
(9, 44),
(12, 44),
(10, 45),
(12, 45),
(10, 46),
(12, 46),
(10, 47),
(10, 48),
(10, 50),
(9, 51),
(10, 53),
(10, 54),
(10, 55),
(12, 57),
(10, 59),
(9, 60),
(12, 60),
(10, 61),
(10, 62),
(9, 64),
(10, 64),
(12, 64),
(9, 65),
(10, 66),
(12, 66),
(10, 67),
(9, 68),
(12, 68),
(13, 69),
(12, 71),
(13, 71),
(10, 72),
(12, 72),
(9, 74),
(9, 76),
(12, 76),
(9, 78),
(12, 79);

-- --------------------------------------------------------

--
-- Structure de la table `Category`
--

CREATE TABLE `Category` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `Category`
--

INSERT INTO `Category` (`id`, `name`) VALUES
(1, 'Action'),
(2, 'Comédie'),
(3, 'Drame'),
(4, 'Science-fiction'),
(5, 'Animation'),
(6, 'Thriller'),
(7, 'Horreur'),
(8, 'Aventure'),
(9, 'Fantaisie'),
(10, 'Documentaire');

-- --------------------------------------------------------
-- --------------------------------------------------------

--
-- Structure de la table `Movie`
--

CREATE TABLE `Movie` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `year` int DEFAULT NULL,
  `length` int DEFAULT NULL,
  `description` text,
  `director` varchar(255) DEFAULT NULL,
  `id_category` int DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `trailer` varchar(255) DEFAULT NULL,
  `min_age` int DEFAULT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `Movie`
--

INSERT INTO `Movie` (`id`, `name`, `year`, `length`, `description`, `director`, `id_category`, `image`, `trailer`, `min_age`, `featured`) VALUES
(7, 'Interstellar', 2014, 169, 'Un groupe d\'explorateurs voyage à travers un trou de ver pour sauver l\'humanité.', 'Christopher Nolan', 4, 'interstellar.jpg', 'https://www.youtube.com/embed/VaOijhK3CRU?si=76Ke4uw4LYjuLuQ6', 12, 0),
(12, 'La Liste de Schindler', 1993, 195, 'Un industriel allemand sauve des milliers de Juifs pendant l\'Holocauste.', 'Steven Spielberg', 3, 'schindler.webp', 'https://www.youtube.com/embed/ONWtyxzl-GE?si=xC3ASGGPy5Ib-aPn', 16, 0),
(17, 'Your Name', 2016, 107, 'Deux adolescents échangent leurs corps de manière mystérieuse.', 'Makoto Shinkai', 5, 'your_name.jpg', 'https://www.youtube.com/embed/AROOK45LXXg?si=aUQyGk2VMCb_ToUL', 10, 0),
(27, 'Le Bon, la Brute et le Truand', 1966, 161, 'Trois hommes se lancent à la recherche d\'un trésor caché.', 'Sergio Leone', 8, 'bon_brute_truand.jpg', 'https://www.youtube.com/embed/WA1hCZFOPqs?si=TwNZAoM4oj4KpGja', 12, 0),
(44, 'Inception', 2010, 148, 'Un voleur spécialisé dans l\'art subtil de l\'extraction d\'informations à travers les rêves doit accomplir l\'impossible : une inception.', 'Christopher Nolan', 4, 'inception.jpg', 'https://www.youtube.com/embed/YoHD9XEInc0', 12, 0),
(45, 'The Dark Knight', 2008, 152, 'Batman affronte le Joker, un criminel imprévisible qui plonge Gotham dans le chaos.', 'Christopher Nolan', 1, 'dark_knight.jpg', 'https://www.youtube.com/embed/EXeTwQWrcwY', 12, 0),
(46, 'Intouchables', 2011, 112, 'La rencontre improbable entre un riche aristocrate tétraplégique et un jeune de banlieue va bouleverser leurs vies.', 'Olivier Nakache & Éric Toledano', 2, 'intouchables.jpg', 'https://www.youtube.com/embed/34WIbmXkewU', 10, 0),
(47, 'Le Fabuleux Destin d\'Amélie Poulain', 2001, 122, 'Amélie, une jeune serveuse rêveuse, décide de changer la vie des gens qui l\'entourent.', 'Jean-Pierre Jeunet', 3, 'amelie.jpg', 'https://www.youtube.com/embed/HUECWi5pX7o', 10, 0),
(48, 'Coco', 2017, 105, 'Miguel, un jeune garçon passionné de musique, se retrouve au pays des morts pour découvrir les secrets de sa famille.', 'Lee Unkrich', 5, 'coco.jpg', 'https://www.youtube.com/embed/xlnPHQ3TLX8', 10, 0),
(49, 'Joker', 2019, 122, 'L\'origine sombre et réaliste du célèbre ennemi de Batman, à travers l\'histoire d\'Arthur Fleck, un homme marginalisé.', 'Todd Phillips', 6, 'joker.jpg', 'https://www.youtube.com/embed/zAGVQLHvwOY', 16, 0),
(50, 'Get Out', 2017, 104, 'Chris découvre un terrible secret lorsque sa petite amie l’invite dans sa famille très étrange.', 'Jordan Peele', 7, 'get_out.jpg', 'https://www.youtube.com/embed/DzfpyUB60YY', 16, 0),
(51, 'Le Seigneur des Anneaux : La Communauté de l\'Anneau', 2001, 178, 'Frodon, un hobbit, doit détruire un anneau maléfique pour sauver la Terre du Milieu.', 'Peter Jackson', 9, 'lotr1.jpg', 'https://www.youtube.com/embed/V75dMMIW2B4', 10, 0),
(52, 'Les Indestructibles', 2004, 115, 'Une famille de super-héros tente de vivre une vie normale tout en combattant le crime.', 'Brad Bird', 5, 'indestructibles.jpg', 'https://www.youtube.com/embed/eZbzbC9285I', 10, 0),
(53, 'Gladiator', 2000, 155, 'Un général romain trahi devient esclave et cherche vengeance dans l’arène.', 'Ridley Scott', 1, 'gladiator.jpg', 'https://www.youtube.com/embed/owK1qxDselE', 16, 0),
(54, 'Forrest Gump', 1994, 142, 'Forrest, un homme simple au grand cœur, traverse les événements majeurs de l\'histoire américaine.', 'Robert Zemeckis', 3, 'forrest_gump.jpg', 'https://www.youtube.com/embed/bLvqoHBptjg', 10, 0),
(55, 'The Grand Budapest Hotel', 2014, 99, 'Les aventures rocambolesques d’un concierge d’hôtel et de son jeune protégé dans une Europe fictive.', 'Wes Anderson', 2, 'grand_budapest.jpg', 'https://www.youtube.com/embed/1Fg5iWmQjwk', 12, 0),
(56, 'Avatar', 2009, 162, 'Un marine humain se lie à un peuple extraterrestre sur une planète menacée par l’avidité humaine.', 'James Cameron', 4, 'avatar.jpg', 'https://www.youtube.com/embed/5PSNL1qE6VY', 10, 0),
(57, 'Shutter Island', 2010, 138, 'Deux marshals enquêtent sur la disparition d’une patiente dans un hôpital psychiatrique isolé.', 'Martin Scorsese', 6, 'shutter_island.jpg', 'https://www.youtube.com/embed/5iaYLCiq5RM', 16, 0),
(58, 'Le Roi Lion', 1994, 88, 'Simba, un jeune lionceau, doit reprendre sa place légitime de roi après une tragédie familiale.', 'Roger Allers & Rob Minkoff', 5, 'roi_lion.jpg', 'https://www.youtube.com/embed/lFzVJEksoDY', 10, 0),
(59, 'Mad Max: Fury Road', 2015, 120, 'Dans un désert post-apocalyptique, Max aide une femme rebelle à fuir un tyran.', 'George Miller', 1, 'mad_max.jpg', 'https://www.youtube.com/embed/hEJnMQG9ev8', 16, 0),
(60, 'Harry Potter à l\'école des sorciers', 2001, 152, 'Harry découvre qu’il est un sorcier et intègre la célèbre école de Poudlard.', 'Chris Columbus', 9, 'harry_potter1.jpg', 'https://www.youtube.com/embed/VyHV0BRtdxo', 10, 0),
(61, 'La Marche de l\'empereur', 2005, 85, 'Un documentaire émouvant sur la vie des manchots empereurs en Antarctique.', 'Luc Jacquet', 10, 'marche_empereur.jpg', 'https://www.youtube.com/embed/L7tWNwhSocE', 10, 0),
(62, 'Indiana Jones et les Aventuriers de l\'arche perdue', 1981, 115, 'L’archéologue Indiana Jones part à la recherche de l’Arche d’Alliance face aux nazis.', 'Steven Spielberg', 8, 'indiana_jones.jpg', 'https://www.youtube.com/embed/XkkzKHCx154', 12, 0),
(64, 'Spider-Man: Homecoming', 2017, 133, 'Peter Parker essaie de jongler entre sa vie de lycéen et ses responsabilités de super-héros.', 'Jon Watts', 1, 'spiderman_homecoming.jpg', 'https://www.youtube.com/embed/rk-dF1lIbIg', 12, 0),
(65, 'Les Gardiens de la Galaxie', 2014, 121, 'Un groupe de criminels intergalactiques s’allie pour sauver la galaxie d’une menace redoutable.', 'James Gunn', 4, 'guardians_galaxy.jpg', 'https://www.youtube.com/embed/d96cjJhvlMA', 12, 0),
(66, 'Vice-Versa', 2015, 95, 'Les émotions d’une jeune fille prennent vie pour l’aider à traverser un déménagement difficile.', 'Pete Docter', 5, 'vice_versa.jpg', 'https://www.youtube.com/embed/1HFv47QHWJU', 0, 1),
(67, 'La Haine', 1995, 98, 'Trois jeunes dans une cité parisienne vivent une journée tendue après une bavure policière.', 'Mathieu Kassovitz', 3, 'la_haine.jpg', 'https://www.youtube.com/embed/8qY8-rZg_U8', 16, 0),
(68, 'Hunger Games', 2012, 142, 'Dans un futur dystopique, une adolescente participe à un jeu mortel pour survivre.', 'Gary Ross', 4, 'hunger_games.jpg', 'https://www.youtube.com/embed/4S9a5V9ODuY', 12, 0),
(69, 'Shrek', 2001, 90, 'Un ogre grognon part sauver une princesse avec un âne très bavard.', 'Andrew Adamson', 5, 'shrek.jpg', 'https://www.youtube.com/embed/CwXOrWvPBPk', 0, 0),
(70, 'Fight Club', 1999, 139, 'Un employé de bureau insomniaque forme un club de combat secret.', 'David Fincher', 6, 'fight_club.jpg', 'https://www.youtube.com/embed/qtRKdVHc-cE', 18, 0),
(71, 'Monstres & Cie', 2001, 92, 'Deux monstres découvrent l’amitié avec une petite fille dans un monde où les cris alimentent leur ville.', 'Pete Docter', 5, 'monstres_cie.jpg', 'https://www.youtube.com/embed/UHGo5-mWbK4', 0, 0),
(72, 'Fast & Furious 7', 2015, 137, 'L’équipe de Dom affronte un tueur en quête de vengeance.', 'James Wan', 1, 'fast7.jpg', 'https://www.youtube.com/embed/yISKeT6sDOg', 12, 1),
(73, 'Le Labyrinthe', 2014, 113, 'Un ado se réveille amnésique au centre d’un labyrinthe peuplé de dangers.', 'Wes Ball', 4, 'labyrinthe.jpg', 'https://www.youtube.com/embed/AwwbhhjQ9Xk', 12, 0),
(74, 'The Social Network', 2010, 120, 'L’ascension de Facebook et les conflits qui ont accompagné sa création.', 'David Fincher', 10, 'social_network.jpg', 'https://www.youtube.com/embed/lB95KLmpLR4', 12, 0),
(75, 'Les Nouveaux Héros', 2014, 102, 'Un jeune prodige de la robotique et son robot gonflable s’allient pour sauver la ville.', 'Don Hall', 5, 'nouveaux_heros.jpg', 'https://www.youtube.com/embed/z3biFxZIJOQ', 0, 0),
(76, 'Jumanji: Bienvenue dans la jungle', 2017, 119, 'Quatre ados sont aspirés dans un jeu vidéo où ils incarnent des avatars inattendus.', 'Jake Kasdan', 8, 'jumanji.jpg', 'https://www.youtube.com/embed/2QKg5SZ_35I', 10, 1),
(77, 'Le Monde de Nemo', 2003, 100, 'Un poisson clown parcourt l’océan pour retrouver son fils.', 'Andrew Stanton', 5, 'nemo.jpg', 'https://www.youtube.com/embed/wZdpNglLbt8', 0, 0),
(78, 'Grave', 2016, 99, 'Une étudiante vétérinaire découvre un goût pour la viande humaine.', 'Julia Ducournau', 7, 'grave.jpg', 'https://www.youtube.com/embed/6lCWkb0oP8A', 18, 0),
(79, 'La Planète des Singes: Les Origines', 2011, 105, 'Un scientifique développe un traitement qui donne une intelligence supérieure aux singes.', 'Rupert Wyatt', 4, 'planete_singes.jpg', 'https://www.youtube.com/embed/28Z_D9Grh18', 12, 0),
(80, 'Wonder', 2017, 113, 'Un jeune garçon né avec une malformation faciale entre pour la première fois à l’école.', 'Stephen Chbosky', 3, 'wonder.jpg', 'https://www.youtube.com/embed/Ob7fPOzbmzE', 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `User`
--

CREATE TABLE `User` (
  `id` int NOT NULL,
  `name` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'no_avatar.jpg',
  `birth` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `User`
--

INSERT INTO `User` (`id`, `name`, `image`, `birth`) VALUES
(9, 'Edouard.B', 'edouard_b.jpg', '1978-09-18'),
(10, 'Mateo.B', 'mateo_b.jpg', '2005-11-04'),
(12, 'Valentin.P', 'jumanji.jpg', '2006-12-10'),
(13, 'Leo.B', 'leo_b.jpg', '2019-03-12');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Bookmark`
--
ALTER TABLE `Bookmark`
  ADD PRIMARY KEY (`id_user`,`id_movie`),
  ADD KEY `id_movie` (`id_movie`);

--
-- Index pour la table `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Movie`
--
ALTER TABLE `Movie`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_category` (`id_category`);

--
-- Index pour la table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Category`
--
ALTER TABLE `Category`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
--
-- AUTO_INCREMENT pour la table `Movie`
--
ALTER TABLE `Movie`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT pour la table `User`
--
ALTER TABLE `User`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Bookmark`
--
ALTER TABLE `Bookmark`
  ADD CONSTRAINT `Bookmark_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `User` (`id`),
  ADD CONSTRAINT `Bookmark_ibfk_2` FOREIGN KEY (`id_movie`) REFERENCES `Movie` (`id`);

--
-- Contraintes pour la table `Movie`
--
ALTER TABLE `Movie`
  ADD CONSTRAINT `movie_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `Category` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
