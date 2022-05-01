# ☁ EasyCloudBackend

Projet réalisé dans le cadre du Projet Inter Matière (PIM) de l'Estiam en 2022.

Notre objectif est de rendre la création d'instance dans le cloud le plus simple possible.


## PowerShell
Les scripts powershell se trouve dans le dossier ```/powershell-scripts```.
Ils contiennent toutes les fonctions permettant la gestion des VMs.

Pour utiliser ces fonctions, il suffit d'appeler le script souhaité avec un ". " devant de chemin du script.

Exemple : ```. ./powershell-scripts/testMode.ps1;```

Pour autoriser les scripts PowerShell à s'exécuter sur la machine :
```Set-ExecutionPolicy -ExecutionPolicy RemoteSigned```

Pour repasser en mode restreint :
```Set-ExecutionPolicy -ExecutionPolicy Restricted```

Pour tester un script final. Il faut modifier la variable ```production``` :
- ```const production =  false``` pour tester en mode dev.
- ```const production =  true``` end prod et pour tester en mode dev le script final.