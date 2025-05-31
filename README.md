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

- **index**
  - `GET` — _`/`_ : route index
- **circuits**
  - `GET` — _`/api/circuits`_ : afficher tous les circuits
  - `GET` — _`/api/circuits/{circuitId}`_ : afficher les informations du circuit
    `circuitId`
  - `PUT` — _`/api/circuits/{circuitId}/edit`_ : modifier le circuit `circuitId`
  - `POST` — _`/api/circuits/new`_ : créer un nouveau circuit
  - `DELETE` — _`/api/circuits/{circuitId}`_ : supprimer le circuit `circuitId`

- **calendar**
  - `GET` — _`/api/calendar`_ : afficher tous les événements
  - `GET` — _`/api/calendar/{date}`_ : afficher les événements à une date donnée

- **forum**
  - `GET` — _`/api/forum`_ : afficher tous les sujets du forum
  - `GET` — _`/api/forum/{idForumTopic}`_ : afficher tous les messages du sujet
    `idForumTopic`
  - `GET` — _`/api/forum/{idForumTopic}/consult`_ : afficher le titre du sujet
    `idForumTopic`
  - `POST` — _`/api/forum/{idForumTopic}/post`_ : publier un message dans le
    sujet `idForumTopic`
  - `POST` — _`/api/forum/post`_ : créer un nouveau sujet de forum

- **teams**
  - `GET` — _`/api/teams`_ : afficher toutes les équipes
  - `GET` — _`/api/teams/{teamId}`_ : afficher les informations de l’équipe
    `teamId`
  - `PUT` — _`/api/teams/{teamId}/edit`_: modifier l’équipe `teamId`
  - `POST` — _`/api/teams/new`_ : créer une nouvelle équipe
  - `DELETE` — _`/api/teams/{teamId}`_ : supprimer l'équipe `teamId`

- **members**
  - `GET` — _`/api/members`_ : afficher tous les membres
  - `GET` — _`/api/members/{memberId}`_ : afficher les informations du membre
    `memberId`
  - `POST` — _`/api/members/new`_ : créer un nouveau membre

- **inscription/connexion**
  - `GET` — _`/api/register/homonyms/{name}/{firstName}`_ : vérifier les
    homonymes libres
  - `POST` — _`/api/register`_ : enregistrer un nouveau membre
  - `POST` — _`/api/login`_ : se connecter via email et mot de passe
  - `GET` — _`/api/connected`_ : vérifier l’état de connexion via le token JWT

- **vehicules**
  - `GET` — _`/api/vehicules`_ : récupérer tous les véhicules

- **sponsors**
  - `GET` — _`/api/sponsors`_ : récupérer tous les sponsors
  - `POST` — _`/api/sponsors/new`_ : créer un nouveau sponsor
