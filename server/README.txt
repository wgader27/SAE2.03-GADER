/server

C'est ici que vous placerez votre application PHP en charge de répondre aux requêtes issues de l'application client 
ou de l'application backoffice. 
Le schéma applicatif dans lequel nous nous plaçons est celui d'applications front (client ou backoffice) qui 
s'alimentent en données en interrogeant l'application /server. Les données transmises le sont au format JSON.


Pour rappel : 
    . model.php est le fichier où l'on déclare les fonctions "outils" qui réalisent les opérations utiles sur la base de données
    . script.php est le fichier où l'on observe les paramètres des requêtes pour savoir quelle fonction "outil" utiliser pour répondre à la requête.

Note : si nécessaire, pour tester la correction de R2.13-TP7, vous disposez du fichier Repas.sql que vous pouvez importer
si jamais vous avez besoin de recréer la table Repas. Bien entendu, dans le cadre de votre SAE, vous utiliserez d'autres tables.
