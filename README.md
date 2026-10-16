# Campus Matériel

Application React monopage permettant aux étudiants de consulter et réserver du matériel, et au responsable de gérer le catalogue.

## Lancer le projet

```bash
npm install
npm run dev
```

Le projet utilise React, React Router et Vite. Les données sont conservées dans `localStorage` : le catalogue, les réservations et la session survivent au rechargement.

## Comptes de démonstration

- Alice Martin — Étudiante
- Yanis Bernard — Étudiant
- Camille Dupont — Responsable

La connexion est simulée, aucun mot de passe n’est demandé.

## Document de présentation

Le document [`docs/Presentation_professeur.md`](docs/Presentation_professeur.md) présente l’objectif, les fonctionnalités, les comptes, les routes et le parcours technique d’une réservation.

## Routes

- `/login` : choix du compte
- `/catalogue` : catalogue, recherche et filtre
- `/materiels/:id` : fiche et réservation
- `/mes-reservations` : réservations de l’étudiant connecté
- `/gestion` : gestion du catalogue pour le responsable
- `/gestion/nouveau` et `/gestion/:id/modifier` : formulaire partagé
- `/acces-refuse` : message de contrôle des droits

## Fonctionnalités réalisées

- État partagé React avec persistance locale et gestion des erreurs de stockage.
- Disponibilité calculée à partir des réservations actives.
- Réservation unique par équipement, annulation et visibilité limitée à l’étudiant connecté.
- Protection des routes selon la session et le rôle, page 404 et chargement différé de la gestion.
- Formulaire contrôlé réutilisé pour créer et modifier, validation compréhensible et confirmation avant suppression.
- Interface responsive et accessible avec labels, boutons explicites et messages d’état.

## Limites connues

La connexion est uniquement une démonstration frontend : il n’y a ni serveur, ni authentification réelle, ni synchronisation entre navigateurs.
