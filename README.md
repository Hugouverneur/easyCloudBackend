# ☁ EasyCloudBackend

Projet réalisé dans le cadre du Projet Inter Matière (PIM) de l'Estiam en 2022.

Notre objectif est de rendre la création d'instance dans le cloud le plus simple possible.


## Structure
L'initialisation du serveur express se trouve dans le fichier ```index.js``` à la racine du projet.

Les routes sont définies dans des fichiers séparés en fonction de leurs actions. Les routes concernant la gestion des machines virtuelles se trouvent dans ```manageVm.js```.

## PowerShell
Les scripts powershell se trouve dans le dossier ```/powershell-scripts```.
Ils contiennent toutes les fonctions permettant la gestion des VMs.

Pour utiliser ces fonctions, il suffit d'appeler le script souhaité avec un ". " devant de chemin du script.

Exemple : ```. ./powershell-scripts/testMode.ps1;```

Pour autoriser les scripts PowerShell à s'exécuter sur la machine :
```Set-ExecutionPolicy -ExecutionPolicy RemoteSigned```

Pour repasser en mode restreint :
```Set-ExecutionPolicy -ExecutionPolicy Restricted```