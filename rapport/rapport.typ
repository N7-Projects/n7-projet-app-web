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

#figure(caption: [Exemple d'un équipe qui possède deux membres et deux sponsors])[#image(
    "./team_view.png",
  )]

=== Les routes




- `/` : route index
- Circuits
  - `GET /api/circuits` : afficher tous les circuits
  - `POST /api/circuits/new` : créer un nouveau circuit
  - `GET /api/circuits/{circuitId}` : afficher les informations du circuit `circuitId`
  - `PUT /api/circuits/{circuitId}/edit` : modifier le circuit `circuitId`
- Calendrier
  - `GET /api/calendar` : afficher tous les événements
  - `GET /api/calendar/{date}` : afficher les événements à une date donnée
- Forum
  - `GET /api/forum` : afficher tous les sujets du forum
  - `POST /api/forum/post` : créer un nouveau sujet de forum
  - `GET /api/forum/{idForumTopic}` : afficher tous les messages du sujet `idForumTopic`
  - `POST /api/forum/{idForumTopic}/post` : publier un message dans le sujet `idForumTopic`
  - `GET /api/forum/{idForumTopic}/consult` : afficher le titre du sujet `idForumTopic`
- Équipes
  - `GET /api/teams` : afficher toutes les équipes
  - `POST /api/teams/new` : créer une nouvelle équipe
  - `GET /api/teams/{teamId}` : afficher les informations de l’équipe `teamId`
  - `PUT /api/teams/{teamId}/edit` : modifier l’équipe `teamId`
- Inscription / Connexion
  - `GET /api/register/homonyms/{name}/{firstName}` : vérifier les homonymes libres
  - `POST /api/register` : enregistrer un nouveau membre
  - `POST /api/login` : se connecter via email et mot de passe
  - `GET /api/connected` : vérifier l’état de connexion via le token JWT

