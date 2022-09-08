const express = require('express');
const { exec, spawn } = require('child_process');
const { response } = require('express');
const Logger = require('nodemon/lib/utils/log');

function createRouter() {
    const router = express.Router();

    //Qui serait exécuté sur la page du formulaire de création de la VM
    router.get('/initcreation', async (req, res, next) => {
        let proc = exec("Get-AvailableIso", {'shell':'powershell.exe'}, (error, data) => {
            if(error) {
                console.log(error);
            } else {
                console.log(data)
                data = JSON.parse(data)
                res.status(200).json(data)
                
                //Envoyer la valeur à Angular pour que le bouton ait comme :
                
                //valeur à envoyer au script : \\Item1.Folder\Item1.Filename
                
                //valeur d'affichage du select: option1 = Item1.Filename     option2 = Item2.Filename 
            }
        });
    });

    router.post('/createvm', async (req, res, next) => {
        console.log(req.body);
        var commandInput = `Add-NewVM -VMName ${req.body.vmName} -VMRam ${req.body.ram}${req.body.ramUnity} -VMDiskSize ${req.body.storage}${req.body.storageUnity} -VMOS ${req.body.os} -VMProcessor ${req.body.processor} -VirtualizationServer ${req.body.virtualizationServer}`

        console.log(commandInput)

        let proc = exec(commandInput, {'shell':'powershell.exe'}, (error, data) => {
            if(error) {
                console.log(error);
            } else {
                data = data.split(/\r?\n/)
                console.log(data)

                data.forEach(element => {
                    if(element.includes('Id:')) {
                        var vmId = element.replace('Id: ', '')
                        console.log(vmId)

                        res.json({
                            vmId: vmId,
                        })// Pour retourner des données après le POST /!\ angular attend du json /!\

                        //Enregistrer dans la bdd les infos de la vm avec son vmId
                    }
                });
            }
        });
    });

    router.post('/deletevm', async (req, res, next) => {
        var commandInput = `Uninstall-VM -VmId ${req.body.vmId} -VirtualizationServer ${req.body.virtualizationServer}`

        console.log(commandInput)

        let proc = exec(commandInput, {'shell':'powershell.exe'}, (error, data) => {
            if(error) {
                console.log(error);
            } else {
                console.log(data)

                //Si data affiche un message d'erreur affirmant qu'il n'a pas trouvé la VM ne pas s'inquièter celà veut dire que la machine a bien été supprimée

                //Supprimer les infos de la VM aussi dans la base de données
            }
        });
    });

    router.get('/instance-monitoring', async (req, res, next) => {
        var commandInput = `Get-MonitoringData -VMId ${req.body.instanceId} -VirtualizationServer ${req.body.virtualizationServer}`

        //Get-MonitoringMode -VMId ${req.body.instanceId}  => Voir si le monitoring est activé ou non sur la VM retourne un JSON en type String
        
        //Update-MonitoringMode -VMId ${req.body.instanceId} -isMonitored False -VirtualizationServer VMSRV01  => Activer/Désactiver le monitoring

        console.log(commandInput) 

        let proc = exec(commandInput, {'shell':'powershell.exe'}, (error, data) => {
            if(error) {
                console.log(error);

            } else {
                console.log(data)
            }
        });
    });

    return router;
}

module.exports = createRouter;