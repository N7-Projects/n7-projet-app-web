#import "template.typ": *
#show link: it => {
  set text(blue)
  if type(it.dest) != str {
    it
  } else {
    underline(it)
  }
}

#show: project.with(
  subject: "Applications Web",
  title: "Hagimettaceinture",
  authors: (
    "THEVENET Louis",
    "LEBOBE Timothé",
    "LECUYER Simon",
    "SABLAYROLLES Guillaume",
  ),
  date: "28 Juin 2025",
  subtitle: "Groupe L34",
  toc: true,
)


= Hagimettaceinture

Le projet est une application de centralisation de circuits et d'équipes pour passionnés de courses, on peut y retrouvé un ensemble de circuits renseignés par les usagers du site. Les usagers peuvent discuter au travers d'un forum de discussion et se tenir informé en s'inscrivant à une newsletter (non opérationnel).
Les utilisateurs peuvent aussi communiquer les prochains événements au travers d'un calendrier et de la création de Meeting (courses, réunion, ...)


= Architecture
== Strucutre

Le projet se sépare en deux parties :
 - Dossier `client` : pour les sources du front-end (réalisé en React sur un server Deno)
 - Dossier `server` : le backend avec les entités et controller
 - Dossier db : la base de données du server

Pour lancer le projet il suffit d'installer #link("https://docs.deno.com/runtime/getting_started/installation/")[Deno] et #link("https://github.com/casey/just")[Just] pour lancer le server frontend et back.

Utiliser les commandes : `just db`, `just back` et `just db` dans des terminals différents pour lancer les différentes parties du projet.


Les différents routes du backend sont listées dans le Readme de ce projet (avec leur route et méthode)
== Entités


/ Race: #underline[id], _circuit_, date, _vehiculeType_, participants
/ Member: #underline[idMembre], name, firstName, vehicules, subscriber
/ Vehicule: #underline[id], _vehiculeType_, branch, model, licensePlate, date, _owner_
/ Circuit: #underline[id], place, distance, turnNumber, spectatorNumber, name, bestTime
/ Meeting: #underline[id], title, guests, date
/ Sponsoring: #underline[id], _racingTeam_, _sponsor_, date, duration, investment
/ RacingTeam: #underline[idRacingTeam], nom, classement, membres, sponsors
/ Sponsor: #underline[id], name, investedCapital, date

Nous avons également utilisé une classe entité abstraite `Event` avec la stratégie d'héritage `InheritanceType.TABLE_PER_CLASS`.

Voici les classes qui en héritent :
/ `Race`: pour sa date d'occurence,
/ `Vehicule`: pour sa date de mise en service,
/ `Circuit`: pour sa date de création,
/ `Meeting`: pour sa date d'occurence,
/ `Sponsoring`: pour ses dates de début et de fin,
/ `Sponsor`: pour sa date de création.

Ceci nous permet de traiter toutes ces entités comme des évènements pour les afficher sur notre page calendrier.

= Blog de l'avancement

== 21 mars 2025
  - Thème de l'application : gestionnaire de sport automobile
  - Création des entités 
  - Création des premières routes importantes (back et front)

== 1 avril 2025
  - UI du site web et design
  - Création des premières requêtes pour récupérer les circuits et équipe
  - Implémentation de l'entité `Event` pour créer différents informations sur le calendrier
  - Ajout du forum et la possibilité de poster des nouveaux topics et message dans ces topics

== 20 mai 2025
  - Ajout de l'authentification avec JWT
  - Edition des équipes et circuits
  - Ajout (et création) de membres et sponsors lors de l'ajout d'une nouvelle équipe
  - Liaison d'un membre avec son nom prénom lors de la création d'un compte s'il avait était ajouté à une équipe
  - Dashboard d'un membre pour afficher ses informations

== 25 mai 2025
  - Ajout de l'autorisation : 
    - Circuit : création et édition uniquement si l'utilisateur est connecté
    - Equipe : création d'un équipe si l'utilisateur et connecté, modification uniquement si le membre fait partie de l'équipe
    - Forum : ajout de topic et message si l'utilisateur est connecté
    - Calendar : ajout d'événements si l'utilisateur et connecté