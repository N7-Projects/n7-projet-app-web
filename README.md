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

1. **Course**: id, circuit, date, Voiture, Participant
2. **Membre** : id, Nom, Prenom, Voiture
3. **Voiture**: id, Marque, Model, Plaque, Année
4. **Ecurie**: id, nom, supporter(membre), Sponsor
5. **Circuit**: id, lieu, distance, nombre de virage, spectateur
6. **Réunion**: id, lieu, date, Ordre Du Jour, Participant
7. **Sponsor**: id, capital d'investissement, date de création
8. **Sponsoring**: id, ecurie, sponsor, date de commencement, date de fin,
   capital d'investissement

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
