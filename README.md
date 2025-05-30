# Projet d'application web

## Setup

### Deno

Installer [deno](https://docs.deno.com/runtime/getting_started/installation/)
pour pouvoir démarrer le serveur.

Eventuellement ajouter l'extension deno sur vscode pour avoir le lsp, coloration
syntaxique. Puis dans le projet ouvrir la palette de commande et faire
`Deno: initialize workspace`.

### Just

[Just](https://github.com/casey/just) permet de lancer facilement les commandes
de build.

## Lancer le front-end

`just front` lancera le serveur de front-end.

## Lancer le back-end

`just back` lancera le back-end du projet.

# Modifier le projet

## Les entités

- Race: _id_, **circuit**, date, **vehiculeType**, participants
- Member: _idMembre_, name, firstName, vehicules, subscriber
- Vehicule: _id_, **vehiculeType**, branch, model, licensePlate, date, **owner**
- Circuit: _id_, place, distance, turnNumber, spectatorNumber, name, bestTime
- Meeting: _id_, title, guests, date
- Sponsoring: _id_, **racingTeam**, **sponsor**, date, duration, investment
- RacingTeam: _idRacingTeam_, nom, classement, membres, sponsors
- Sponsor: _id_, name, investedCapital, date

## Les routes

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
