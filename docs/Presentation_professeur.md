# Présentation du projet Campus Matériel

Application web de consultation et de réservation de matériel pédagogique.

## Objectif du projet

Campus Matériel est une application monopage destinée à un établissement qui souhaite proposer son matériel aux étudiants. Elle permet de consulter un catalogue, de réserver un équipement disponible et de gérer les fiches de matériel avec un compte responsable.

La connexion est simulée avec trois comptes de démonstration. L’objectif est de montrer le fonctionnement frontend, la gestion d’état, la navigation et la persistance locale sans mettre en place de serveur.

## Fonctionnalités réalisées

| Partie | Fonctionnement |
| --- | --- |
| Catalogue | Six équipements répartis dans quatre catégories, recherche par nom, filtre par catégorie, disponibilité et fiche détaillée. |
| Réservations | Un étudiant peut réserver plusieurs équipements différents. Un équipement ne peut avoir qu’une réservation active. L’annulation libère immédiatement le matériel. |
| Gestion | Le responsable peut créer, modifier et supprimer une fiche. La suppression d’un équipement réservé est refusée avec un message explicite. |
| Validation | Le formulaire partagé vérifie le nom, la description et la localisation, en conservant les valeurs saisies en cas d’erreur. |
| Persistance | La session, le catalogue et les réservations sont restaurés depuis `localStorage` après rechargement. |

## Comptes de démonstration

| Compte | Rôle | Droits principaux |
| --- | --- | --- |
| Alice Martin | Étudiante | Catalogue, détail, réservation et annulation de ses réservations |
| Yanis Bernard | Étudiant | Catalogue, détail, réservation et annulation de ses réservations |
| Camille Dupont | Responsable | Catalogue et gestion complète des fiches |

## Routes principales

- `/login` : choix du compte.
- `/catalogue` : catalogue, recherche et filtre.
- `/materiels/:id` : fiche détaillée et réservation.
- `/mes-reservations` : réservations de l’étudiant connecté.
- `/gestion` : gestion du catalogue pour le responsable.
- `/gestion/nouveau` et `/gestion/:id/modifier` : formulaire partagé.
- `/acces-refuse` : contrôle des droits.

## Parcours d’une réservation

Le parcours est piloté par l’état partagé fourni par `AppContext` :

```text
Clic sur Réserver
  -> contrôle de disponibilité
  -> ajout de la réservation
  -> sauvegarde dans localStorage
  -> mise à jour des vues
```

1. L’étudiant ouvre la fiche d’un équipement.
2. L’application cherche une réservation active portant le même identifiant.
3. Si l’équipement est libre, une réservation est créée avec un identifiant unique, l’identifiant du matériel et celui de l’étudiant.
4. Le nouvel état est enregistré dans `localStorage`.
5. Le catalogue, la fiche et la page « Mes réservations » se mettent à jour sans rechargement manuel.

## Organisation technique

- **Pages** : connexion, catalogue, détail, réservations, gestion, accès refusé et 404.
- **Composants réutilisables** : mise en page, cartes équipement, badge de disponibilité et icônes.
- **État partagé** : session, équipements et réservations dans un contexte React.
- **Protection** : les routes privées redirigent vers la connexion et les routes réservées au responsable contrôlent le rôle.
- **Chargement** : l’espace de gestion est chargé à la demande avec `lazy` et `Suspense`.

## Limites connues

Cette version est une démonstration frontend. Il n’y a pas de serveur, de véritable authentification ou de synchronisation entre plusieurs navigateurs. Dans une application réelle, les permissions et les règles de réservation devraient aussi être vérifiées côté serveur.

## Lancement

Depuis le dossier du projet :

```bash
npm install
npm run dev
```
