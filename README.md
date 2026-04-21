Projet : Dashboard de Prévisions Météorologiques
Présentation du projet
Ce projet consiste en le développement d'une application web dynamique permettant de consulter les données météorologiques en temps réel pour n'importe quelle ville du monde. Il a été réalisé dans le cadre du parcours BTS SIO (Option SLAM) pour démontrer la maîtrise des requêtes asynchrones et de la persistance des données côté client.

Technologies utilisées
Frontend : HTML5, CSS3 (Flexbox et Grid Layout)

Langage : JavaScript (ES6+)

Architecture : API REST (Consommation de données JSON)

Données : OpenWeatherMap API

Stockage : LocalStorage (Persistance navigateur)

Fonctionnalités principales
Recherche dynamique : Consultation des conditions actuelles (température, humidité, vitesse du vent) par nom de ville.

Gestion des favoris : Système d'ajout et de suppression de villes favorites avec sauvegarde automatique dans le LocalStorage.

Interface ergonomique : Utilisation d'un volet latéral coulissant pour la gestion de l'espace de travail.

Suggestions aléatoires : Affichage de trois villes aléatoires à chaque chargement pour enrichir l'expérience utilisateur.

Traitement des erreurs : Gestion des cas de villes introuvables ou de problèmes de connexion réseau via des blocs try/catch.

Architecture technique
Le projet repose sur une séparation claire des responsabilités :

Récupération des données : Utilisation de l'API fetch pour effectuer des requêtes GET asynchrones vers les endpoints d'OpenWeatherMap.

Traitement des données : Formatage des unités (conversion m/s en km/h) et manipulation des chaînes de caractères pour l'affichage.

Manipulation du DOM : Injection dynamique du contenu HTML suite à la réception des objets JSON.

Persistance : Sérialisation et désérialisation de tableaux d'objets pour le stockage dans le cache du navigateur.

Installation et utilisation
Cloner le dépôt sur votre machine locale.

Ouvrir le fichier script.js pour insérer votre propre clé API OpenWeatherMap dans la constante apiKey.

Lancer le fichier index.html dans un navigateur Web (de préférence via un serveur local comme Live Server).

Compétences validées (Référentiel BTS SIO)
Gérer le patrimoine informatique (Recensement des ressources numériques).

Répondre aux incidents (Débogage et gestion d'erreurs API).

Développer la présence en ligne (Développement d'une interface web moderne).

Travailler en mode projet (Analyse des besoins et itérations successives).
