CAMPUS MATÉRIEL — JEU DE DONNÉES

Choisir le fichier correspondant au framework utilisé.

ANGULAR
Copier donnees-initiales.ts dans src/app/data/.
Depuis un fichier situé dans src/app/, importer par exemple :
import { EQUIPEMENTS_INITIAUX, COMPTES_INITIAUX,
  RESERVATIONS_INITIALES, CATEGORIES } from './data/donnees-initiales';

REACT
Copier donnees-initiales.js dans src/data/.
Depuis un fichier situé dans src/, importer par exemple :
import { EQUIPEMENTS_INITIAUX, COMPTES_INITIAUX,
  RESERVATIONS_INITIALES, CATEGORIES } from './data/donnees-initiales';

CONTENU IDENTIQUE POUR LES DEUX FRAMEWORKS
6 équipements, répartis dans 4 catégories.
Alice Martin (id 1) et Yanis Bernard (id 2) : role student.
Camille Dupont (id 3) : role manager.
Aucune réservation initiale : tous les équipements sont disponibles.
Les personnes sont fictives. La connexion est simulée, sans mot de passe.

STRUCTURE D'UNE RÉSERVATION ACTIVE
{ id: 'identifiant-unique', equipementId: 101, etudiantId: 1 }
Cet exemple n'est pas préchargé. Il représenterait une réservation
par Alice du premier ordinateur portable.

À RÉALISER PAR LES ÉTUDIANTS
Créer l'état partagé, les opérations et la persistance.
Copier les tableaux avec structuredClone avant de les modifier.
Charger les valeurs initiales uniquement en l'absence de stockage.
Un tableau vide sauvegardé ne signifie pas une absence de stockage.
Calculer la disponibilité à partir des réservations actives.
Lors d'une annulation, supprimer la réservation correspondante.
Ne pas utiliser la longueur d'un tableau comme générateur d'identifiants.

SCÉNARIO DE CONTRÔLE
1. Alice réserve l'équipement 101.
2. Yanis ne le voit pas dans ses propres réservations et ne peut pas le réserver.
3. Camille ne peut pas supprimer l'équipement 101 tant qu'il est réservé.
4. Alice annule : le matériel redevient disponible.
5. Recharger : les données enregistrées doivent être conservées.

Ce kit contient uniquement les données initiales et leurs types Angular.
Il ne contient pas la solution du projet.
