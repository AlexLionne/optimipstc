#DOCUMENTATION
[Lien du site](https://optimips-tc.firebaseapp.com/)  

**Login** admin@optimips.fr

**Mot de passe** 123456
## **ReactStrap**
[Framework UI React](https://reactstrap.github.io/)  

## **Comptes & Démarrage**
Merci de bien vouloir créer un compte sur le platformes suivantes : 
### MapBox
Mapbox est utilisé pour la partie cartographie du site, son système de 'pay as you go'
nous permet d'utiliser se service gratuitement.

Merci de bien vouloir modifier cette ligne après avoir créer un compte et récupérer le token.
  #### src/views/cartographie/Cartographie.jsx : 178
`const Map = ReactMapboxGl({  
            accessToken: "pk.[token]"
         });
`

[Créer un compte](https://account.mapbox.com/auth/signup/)  

[Documentation](https://github.com/alex3165/react-mapbox-gl/blob/master/docs/API.md)  

[Mapbox Studio](https://www.mapbox.com/mapbox-studio/)


### Firebase
 #### optimips-tc-export.json
Importer la base de données dans l'espace firebase

[Créer un compte](https://console.firebase.google.com/u/0/)  

[Documentation](https://firebase.google.com/docs/?authuser=0)


## **src\Index.js**

Point d'entrée du programme

``ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, document.getElementById('root'));``
### Fonctions
##### checkSession()
`function checkSession(uid)`

 `@param uid` ID de l'utilisateur

 Permet de verifier si la sessions stockée en backend dans firebase et toujours valide
 temps maximum d'une sessions est par défaut d'une heure.
##### registerSession()
`function registerSession()`

Enregistrer une nouvelle session auprès de la base de données
##### unRegisterSession
`function unRegisterSession()`

Supprime la session de l'utilisateur auprès de la base de données
##### login()
`login(email,password)``

Connecte un utilisateur au site Optimips
##### logout()
`logout()`
`()=> unRegisterSession()`

Déconnecte un utilisateur en supprimant sa sessions

##### getNotifications
`getNotifications()`

Récupère la liste des notifications de l'utilisateur  
  
    
      
## **src\App.js**

Fichier principal du site, gère les routes & composants
### Fonctions


##### createAndLogUsers()
`function createAndLogUsers(structures)`

 `@param structures` Strcutures valide ( avec un mail)

 Créer tous les utilisateurs dont la structure et valide
##### setStructuresValides()
`function setStructuresValides()`

Défini les structures valides
##### generatePassword()
`generatePassword()``

Génère un mot de passe aléatoire
##### componentDidMount()
`componentDidMount()`

Gère l'état des tabs (actif / innactif)  
  

## **src\views\AutoComplete.jsx**
Composant d'autocompletion  

`props : placeholder, list`

## **src\views\Avatar.jsx**
Avatar dans le menu de Navigation


## **src\views\ChatBot.jsx**
ChatBot du site
### Fonctions


##### url()
`function url(id)`

 `@param id` ID de la question 

Met a jour la prochaine question
##### back()
`function url(id)`

 `@param id` ID de la question 

Met a jour la prochaine question
##### openCard()
`function openCard()`


Affiche le ChatBot

## **src\views\Controller.jsx**
Possibilité de définir des actions ou taches avant l'affichage d'une vue
## **src\views\EditView.jsx**
Champ de saisie de l'éditeur
## **src\views\Notification.jsx**
Notifications dans l'application (boîte en haut à droite)

Possède 3 niveaux de contenu : 

`success ` : notification verte

`warning ` : notification orange

`success ` : notification rouge

##### Exemple 

 ` <Notification verbose={'error'} message={'Impossible de se connecter'}/>`

## **src\views\ParcoursSoins.jsx**
Il s'agit du composant qui gère le schéma des différents parcours.
La structure originale du composant a été modifiée afin de répondre au besoin.


#### Données
Voici un exemple de tableau. Ce tableau fonctionne comme un arbre, avec des branches, des noeuds.
On retrouve un relation `parent-enfant` Et `enfant-parent` dans ce sens, un parent peut avoir **plusieurs** enfants tout comme un enfant peut avoir **plusieurs** parents.

Chaque noeud (étape) possède des caractéristiques : 

```json
 {"name": "nom",
      "id":"id textuel",
      "common_child":"enfant en commun",
      "size":"taille",
      "color":"couleur",
      "text":"texte de description",
      "illustration":"illustration", // import illustration from ../
      "children":"liste d'enfants"}
```
#### Exemple 
```json
const parcours_soins = {
      "name": "Accident",
      "id":"accident",
      "common_child":null,
      "size":100,
      "color":null,
      "text":null,
      "illustration":null,
      "children": [{
          "name": "Samu",
          "id":"samu",
          "common_child":null,
          "size":80,
          "color":"#9575CD",
          "text":"Texte descriptif Samu",
          "children": [
              {   "name": "Urgences",
                  "id":"urgences",
                  "common_child":"child_one",
                  "size":100,
                  "color":"#F06292",
                  "text":"Texte descriptif Urgences",
                  "children": [
                      {   "name": " ",
                          "id":"child_one",
                          "common_child":null,
                          "size":150,
                          "color":null,
                          "text":null,
                          "children": [
                              {   "name": "Neurochirurgie",
                                  "id":"neurochirurgie",
                                  "common_child":"child_two",
                                  "size":150,
                                  "color":"#4DB6AC",
                                  "text":"Texte descriptif Neurochirurgie",
                              },
  
                              {   "name": "Chir Ortho",
                                  "id":"chirortho",
                                  "common_child":"child_two",
                                  "size":150,
                                  "color":"#4DB6AC",
                                  "text":"Texte descriptif Chir Ortho",
                                  "children": [
                                      {   "name": " ",
                                          "id":"child_two",
                                          "common_child":"mpr",
                                          "size":150,
                                          "color":null,
                                          "text":null,
                                          "children": [
                                              {   "name": "Domicile",
                                                  "id":"domicile",
                                                  "common_child":null,
                                                  "size":100,
                                                  "color":"#FF8A65",
                                                  "text":"Texte descriptif Domicile",
                                              },
                                              {   "name": "Unité Eveil",
                                                  "id":"uniteeveil",
                                                  "common_child":null,
                                                  "size":120,
                                                  "color":"#FF8A65",
                                                  "text":"Texte descriptif Unité Eveil",
                                              },
                                              {   "name": "Service de Rééducation",
                                                  "id":"servicedereeducation",
                                                  "common_child":null,
                                                  "size":220,
                                                  "color":"#FF8A65",
                                                  "text":"Texte descriptif Service de Rééducation",
                                              }]
                                      }],
                              },
                              {   "name": "Neurologie",
                                  "id":"neurologie",
                                  "common_child":"child_two",
                                  "size":150,
                                  "color":"#4DB6AC",
                                  "text":"Texte descriptif Neurologie",
                              },
                              {   "name": "Pédiatrie",
                                  "id":"pediatrie",
                                  "common_child":"child_two",
                                  "color":"#4DB6AC",
                                  "text":"Texte descriptif Pédiatrie",
                                  "size":150,
                                  "visible":{
                                      "age":"Enfant"
                                  }
                              },
                          ]
                      }]
              },
              {   "name": "Réanimation",
                  "id":"reanimation",
                  "common_child":"child_one",
                  "size":120,
                  "color":"#F06292",
                  "text":"Texte descriptif Réanimation",
                  "children": [
                      {   "name": " ",
                          "id":"null",
                          "common_child":null,
                          "color":null,
                          "text":null,
                          "children": [
                              {   "name": "SRPR",
                                  "id":"srpr",
                                  "common_child":"child_two",
                                  "size":80,
                                  "color":"#4DB6AC",
                                  "text":"Texte descriptif SRPR",
                              }]
                      }]
              },
          ]},
      ],
  };
```

[Documentation](https://vx-demo.now.sh/)

## **src\views\Views.jsx**
Vue principale, c'est la même pour toute les pages.
Elle gère l'intégration du contenu via l'éditeur.


### Fonctions


##### getPage()
`getPage()`

Récupère la page en fonction de la route actuelle
##### addHtml()
`addHtml()`

Ajoute un block html dans l'éditeur
##### addSection()
`addSection()`

Ajoute une section (min-height : 300px)
##### addColumn()
`addColumn()`

Ajoute un colonne dans une section
##### addText()
`addText()`

Ajout d'une zone de text dans l'editeur

## **Build**
commande de construction du site 

`npm run build` créer un dossier build

`firebase deploy` (mise en ligne)

en fonction de la gestion de l'accès au ressources du serveur des chemins d'accès sont a changer
(ajouter un chemin relatif pour toutes les ressources)
#### /build/index.html (unminified) : 12
```html
 <link href="/static/css/2.8d63020b.chunk.css" rel="stylesheet">
 <link href="./static/css/2.8d63020b.chunk.css" rel="stylesheet">
```

## **TODO 25/03/2019**
Base de données
- [ ] Rajouter une colonne pour enfant : oui/non 
- [ ] Une colonne adulte : oui/non 
- [ ] Une colonne personne âgée : oui/non
Contenu
- [ ] Créer une page sport = dans lesMASléger moyen (cas particulier) == lien cliquable qui renvoie sur la page
- [x] Créer le Chatbot, montrer un chabot fonctionnel et expliquer comment le modifier
- [x] Faires des illustrations (photos, avatars ? le tout libre de droit) qui pourront être ré exploité dans tout le site
- [x] Refaire la page d’accueil
- [ ] Intégrer les textes (donner une lisibilité au site pour correction)
- [ ] Intégrer les images des structures
- [ ] Liens page jaune pour la recherche de praticiens
- [x] Indiquer le format qui devra être utilisé pour l’image en entête 1920 x 200



-----
