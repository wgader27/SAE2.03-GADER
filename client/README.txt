/client

C'est ici que vous placerez votre application de type VOD.

La base de code qui vous est donnée correspond à la correction de R2.13-TP7/client.

La structure du projet a été sensiblement modifiée pour vous permettre d'utiliser une approche par composant
à l'image de ce que vous aviez fait dans le cadre de la SAE 1.05.


Vous pourrez créer vos propres composants en les ajoutant dans /component.
Vous disposez d'un exemple de composant "Menu" dans /component/menu/ qui illustre comment procéder.
Attention, pour chaque composant utilisé vous devrez :
    - l'importer dans index.html et le rendre globalement disponible (comme c'est fait pour Menu)
    - importer son style dans /css/base.css (comme c'est fait pour Menu)
L'usage de composant est à privilégier pour toutes les parties dynamique de votre interface.
C'est à dire qui présentent des données issues (fetch) de votre bdd.
Si vous avez des parties statiques (contenu immuable, quoi qu'il arrive), vous pouvez les déclarer directement dans votre HTML.

Description de l'arborescence de /client :
    - /asset pour vos images etc..
    - /component pour vos composants (dynamiques), un répertoire par composant avec dedans 3 fichiers (template.html, style.css et script.js)
    - /css pour... le CSS
    - /js contient juste un petit fichier utils.js avec la fonction qui vous permettra de charger les templates de vos composants
    - /main.js où l'on déclarera entre autre les fonctions à exécuter en fonction des actions (onclick, onchange...) de l'utilisateur
    - /index.html où décrire la structure générale de votre application

    