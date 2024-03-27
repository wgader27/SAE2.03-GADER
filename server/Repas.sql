-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : mer. 27 mars 2024 à 16:01
-- Version du serveur :  5.7.34
-- Version de PHP : 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `mora`
--

-- --------------------------------------------------------

--
-- Structure de la table `Repas`
--

CREATE TABLE `Repas` (
  `semaine` int(11) NOT NULL,
  `jour` varchar(25) NOT NULL,
  `entree` varchar(256) NOT NULL,
  `plat` varchar(256) NOT NULL,
  `dessert` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `Repas`
--

INSERT INTO `Repas` (`semaine`, `jour`, `entree`, `plat`, `dessert`) VALUES
(1, 'dimanche', 'Velouté aux cèpes', 'Côtes d\'agneau et poêlée forestière', 'Glace colonel'),
(1, 'jeudi', 'Oeuf mimosa', 'escalope de veau et gratin de courgettes', 'Fromage'),
(1, 'lundi', 'Radis beurre', 'Pintade et jardinière de légumes', 'Duo de mousses café chocolat'),
(1, 'mardi', 'Asperges sauce blanche', 'Filet de flétan et riz basmati', 'Ile flottante'),
(1, 'mercredi', 'Rosette de Lyon et radis noir', 'Filet de boeuf et frites', 'Crême brulée'),
(1, 'samedi', 'Carottes rapées', 'Petit salé aux lentilles', 'Salade de fruits'),
(1, 'vendredi', 'Avocat surimi', 'Magret de canard sauce foie gras et patates grasses', 'Indigeste au chocolat'),
(2, 'mercredi', 'Huitres', 'Tagliatelles au homard', 'Pommes fondantes');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Repas`
--
ALTER TABLE `Repas`
  ADD PRIMARY KEY (`semaine`,`jour`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
