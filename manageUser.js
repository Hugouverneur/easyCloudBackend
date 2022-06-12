const express = require('express');
const { exec, spawn, execSync } = require('child_process');

function createRouter() {
    const router = express.Router();
 
    //A modifié suivant ce que tu as choisi '/inscription"
    router.post('/inscription', async (req, res, next) => {
        //Quand un utilisateur valide le formulaire la fonction PowerShell Check-... est appelée pour vérifier si l'utilisateur existe dans l'AD
        //Pour celà dans le formulaire d'inscription il doit rentrer son nom et prénom ce qui va associé son compte AD et son compte Applicatif
        //Pour éviter que deux comptes soit créés sur le même utilisateur je te laisses gérer avec la Base de données 
        
        var commandInput = `Find-ApplicationUserExist -Name ${req.body.name} -Lastname ${req.body.lastname}`

        //Retourne un objet

        console.log(commandInput)

       
        let proc = exec(command, {'shell':'powershell.exe'}, (error, data) => {
                if(error) {
                    console.log(error);
                } else {
                    data = data.split(/\r?\n/)
                    console.log(data)

                    data.forEach(element => {
                        if(element.includes('True') || element.includes('False')) {
                            var userExist = element
                            console.log(userExist) //Retourne true/false (en type String)
                            cb(userExist)
                        }

                        //Si userExist = false renvois un message destiné à la page d'inscription par exemple "User not authorised to create an account"

                        //Si userExist = true insère dans la base de donnée toutes les informations du formulaire
                    });
                }
            });
        });

    //Page utilisée quand le formulaire de /connexion et validé libre à toi de changer en fonction des noms de page que tu as choisis
    router.post('/initconnexion', async (req, res, next) => {
        //Etape 1 :
        //Sélectionner dans la BDD les infos de l'utilisateur en fonction du login/password fournit dans la connexion
        
        //Si il trouve rien retourne un message destiné à Angular "User not existing"
        
        //Si oui alors il exécute la commande Powershell Check-... ce qui permet de vérifier si l'utilisateur existe toujours dans l'AD car si il a quitté l'entreprise mais que son
        //compte applicatif existe encore alors il faudrait qu'il ne puisse pas se connecter

        var commandInput = `Find-ApplicationUserExist -Name ${req.body.name} -Lastname ${req.body.lastname}`
        
        var userExist = "Def"
        
        let proc = exec(commandInput, {'shell':'powershell.exe'}, (error, data) => {
            if(error) {
                console.log(error);
            } else {
                data = data.split(/\r?\n/)
                
                data.forEach(element => {
                    if(element.includes('True') || element.includes('False')) {
                        userExist = element
                        console.log(userExist) //Retourne true/false (en type String)
                        res.send(userExist)
                    }
                });
            }
        });

        //récupérer les droits d'accès via l'AD quand connexion
        var commandInput2 = `Get-ApplicationUserPermissions -Name ${req.body.name} -Lastname ${req.body.lastname}`

        let proc2 = exec(commandInput2, {'shell':'powershell.exe'}, (error, data) => {
            if(error) {
                console.log(error);
            } else {
                data = JSON.parse(data)
                res.send(data)
            }
        });
    });

    return router;
}

module.exports = createRouter;