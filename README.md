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

1. **Race**: __idRace__, _idCircuit_, date, _VehiculeType_, _participant(member)_
2. **Member** : __idMember__, Name, Firstname, _Vehicule_, subscriber(boolean)
3. **Vehicule**: __idVehicule__, _VehiculeType_, Marque, Model, Plaque, Année, _owner_
4. **RacingTeam**: __idRacingTeam__, name, ranking, _supporter(member)_, _Sponsor_
5. **Circuit**: __idCircuit__, place, distance, turnNumber, spectator
6. **Meeting**: __idMeeting__, place, date, title, _Participant(Member)_
7. **Sponsor**: __idSponsor__, investmentCapital, creationDate
8. **Sponsoring**: __idSponsoring__, _RacingTeam_, _sponsor_, StartingDate, EndingDate, investmentCapital

## Les routes

- `/` : route index
- `/circuits` : afficher un résumé tous les circuits
  - `/circuits/:circuitId` : afficher les informations du circuit `circuitId`
  - `/circuits/:circuitId/edit` : éditer le circuit `circuitId`
- `/calendar` : afficher le calendrier des événements -`calendar/edit` : éditer
  le calendrier
- `/forum` : accéder au forum et afficher tous les sujets
  - `/forum/:topucId` : accéder au sujet `sujetId`
- `subscribe` : pouvoir s'inscrire à la newsletter
