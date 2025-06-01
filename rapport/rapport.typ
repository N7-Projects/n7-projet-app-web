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


= Projet Application Web

== Architecture

=== Les entités


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

#figure(caption: [Exemple de deux créations de circuits apparaissant sur le calendrier])[#image(
    "./calendar_view.png",
  )]

=== Relations

- Race
  - ManyToOne: Circuit
  - OneToOne: VehiculeType
  - ManyToMany: Member
- Member
  - OneToMany: Vehicule
  - ManyToMany: RacingTeam
- Vehicule
  - ManyToOne: VehiculeType
  - ManyToOne: Member
- Meeting
  - OneToMany: Member
- Sponsoring
  - OneToOne: RacingTeam
  - OneToOne: Sponsor
- RacingTeam
  - ManyToMany: Member
  - ManyToMany: Sponsor

Les entités du systèmes sont fortement liées entre-elles, par exemple, une _Course_ (`Race`) est organisée sur un _Circuit_ donné et concerne un certain _Type de Véhicule_, elle rassemble plusieurs _Membres_ participants, ce qui justifie l’utilisation d’une relation *ManyToMany* entre `Race` et `Member`.
Chaque _Membre_ peut posséder plusieurs _Véhicules_ (*OneToMany*), et chaque véhicule appartient à un seul membre (*ManyToOne*).
Les _Écuries_ (`RacingTeam`) regroupent plusieurs membres et sont soutenues par plusieurs sponsors, d’où des relations *ManyToMany* avec `Member` et `Sponsor`.
Les _Sponsorisations_ (`Sponsoring`) relient précisément une écurie et un sponsor sur une période donnée (*OneToOne*).
Enfin, les _Réunions_ (`Meeting`) peuvent inviter plusieurs membres (*OneToMany*).
Ces relations permettent de modéliser précisément les interactions et les dépendances entre les différents acteurs et objets du domaine.

#figure(caption: [Exemple d'une équipe qui possède deux membres et deux sponsors])[#image(
    "./team_view.png",
  )]

=== Les routes

/ Index:
  - `GET` _`/`_ : route index
/ Circuits:
  - `GET` _`/api/circuits`_ : afficher tous les circuits
  - `GET` _`/api/circuits/{circuitId}`_ : afficher les informations du circuit `circuitId`
  - `PUT` _`/api/circuits/{circuitId}/edit`_ : modifier le circuit `circuitId`
  - `POST` _`/api/circuits/new`_ : créer un nouveau circuit
  - `DELETE` _`/api/circuits/{circuitId}`_ : supprimer le circuit `circuitId`

/ Calendar:
  - `GET` _`/api/calendar`_ : afficher tous les événements
  - `GET` _`/api/calendar/{date}`_ : afficher les événements à une date donnée

/ Forum:
  - `GET` _`/api/forum`_ : afficher tous les sujets du forum
  - `GET` _`/api/forum/{idForumTopic}`_ : afficher tous les messages du sujet `idForumTopic`
  - `GET` _`/api/forum/{idForumTopic}/consult`_ : afficher le titre du sujet `idForumTopic`
  - `POST` _`/api/forum/{idForumTopic}/post`_ : publier un message dans le sujet `idForumTopic`
  - `POST` _`/api/forum/post`_ : créer un nouveau sujet de forum

/ Teams:
  - `GET` _`/api/teams`_ : afficher toutes les équipes
  - `GET` _`/api/teams/{teamId}`_ : afficher les informations de l’équipe `teamId`
  - `PUT` _`/api/teams/{teamId}/edit`_: modifier l’équipe `teamId`
  - `POST` _`/api/teams/new`_  : créer une nouvelle équipe
  - `DELETE` _`/api/teams/{teamId}`_ : supprimer l'équipe `teamId`

/ Members:
  - `GET` _`/api/members`_ : afficher tous les membres
  - `GET` _`/api/members/{memberId}`_ : afficher les informations du membre `memberId`
  - `POST` _`/api/members/new`_ : créer un nouveau membre

/ Inscription/connexion:
  - `GET` _`/api/register/homonyms/{name}/{firstName}`_ : vérifier les homonymes libres
  - `POST` _`/api/register`_ : enregistrer un nouveau membre
  - `POST` _`/api/login`_ : se connecter via email et mot de passe
  - `GET` _`/api/connected`_ : vérifier l’état de connexion via le token JWT

/ Vehicules:
  - `GET` _`/api/vehicules`_ : récupérer tous les véhicules

/ Sponsors:
  - `GET` _`/api/sponsors`_ : récupérer tous les sponsors
  - `POST` _`/api/sponsors/new`_ : créer un nouveau sponsor
