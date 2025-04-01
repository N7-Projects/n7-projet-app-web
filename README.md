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

1. **Race**: <ins>idRace</ins>, _idCircuit_, date, _VehiculeType_,
   _participant(member)_
2. **Member** : <ins>idMember</ins>, Name, Firstname, _Vehicule_,
   subscriber(boolean)
3. **Vehicule**: <ins>idVehicule</ins>, _VehiculeType_, Marque, Model, Plaque,
   Année, _owner_
4. **RacingTeam**: <ins>idRacingTeam</ins>, name, ranking, _supporter(member)_,
   _Sponsor_
5. **Circuit**: <ins>idCircuit</ins>, place, distance, turnNumber, spectator
6. **Meeting**: <ins>idMeeting</ins>, place, date, title, _Participant(Member)_
7. **Sponsor**: <ins>idSponsor</ins>, investmentCapital, creationDate
8. **Sponsoring**: <ins>idSponsoring</ins>, _RacingTeam_, _sponsor_,
   StartingDate, EndingDate, investmentCapital


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
