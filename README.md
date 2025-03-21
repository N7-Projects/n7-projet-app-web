# Projet d'application web

## Initialisation projet

### Installer et configurer deno

Installer deno pour pouvoir lancer le server :

> https://docs.deno.com/runtime/getting_started/installation/

Ajouter l'extension deno sur vscode pour avoir le lsp, coloration syntaxique :

> Dans le projet ouvrir la palette de commande et faire : Deno: initialize
> workspace

### Lancer le front-end

Exécuter la commande suivante pour lancer le server du front-end :

> deno task dev
>
> Serveur lancé à l'adresse : localhost:3000

## Modifier le projet

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
  - `/forum/:sujetId` : accéder au sujet `sujetId`
- `subscribe` : pouvoir s'inscrire à la newsletter
