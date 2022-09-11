const express = require('express');
const { exec, spawn } = require('child_process');
const { response } = require('express');
const Logger = require('nodemon/lib/utils/log');

function createRouter() {
    const router = express.Router();

    let executePowerShell = (commandInput, asRes = 0, res = null) => {
        exec(commandInput, {'shell':'powershell.exe'}, (error, data) => {
            if(error) {
                console.log(error);

            } else {
                try {
                    data = JSON.parse(data)
                    console.log(data);

                    if(asRes && res != null) {
                        res.status(200).json(data)
                    }
                }

                catch {
                    console.log(data);
                }
            }
        });
    }

    router.get('/initcreation', async (req, res, next) => {
        var commandInput = `Get-AvailableIso`
        executePowerShell(commandInput, 1, res);

        // let proc = exec("Get-AvailableIso", {'shell':'powershell.exe'}, (error, data) => {
        //     if(error) {
        //         console.log(error);
        //     } else {
        //         console.log(data)
        //         data = JSON.parse(data)
        //         res.status(200).json(data)
        //     }
        // });
    });

    router.post('/createvm', async (req, res, next) => {
        var commandInput = `Add-NewVM -VMName ${req.body.vmName} -VMRam ${req.body.ram}${req.body.ramUnity} -VMDiskSize ${req.body.storage}${req.body.storageUnity} -VMOS ${req.body.os} -VMProcessor ${req.body.processor} -VirtualizationServer ${req.body.virtualizationServer}`
        executePowerShell(commandInput, 1, res);

        // let proc = exec(commandInput, {'shell':'powershell.exe'}, (error, data) => {
        //     if(error) {
        //         console.log(error);
        //     } else {
        //         data = data.split(/\r?\n/)
        //         console.log(data)

        //         data.forEach(element => {
        //             if(element.includes('Id:')) {
        //                 var vmId = element.replace('Id: ', '')
        //                 console.log(vmId)

        //                 res.json({
        //                     vmId: vmId,
        //                 })// Pour retourner des données après le POST /!\ angular attend du json /!\

        //                 //Enregistrer dans la bdd les infos de la vm avec son vmId
        //             }
        //         });
        //     }
        // });
    });

    router.post('/deletevm', async (req, res, next) => {
        var commandInput = `Uninstall-VM -VmId ${req.body.vmId} -VirtualizationServerName ${req.body.virtualizationServer}`
        executePowerShell(commandInput);
    });

    router.get('/getvmstatus', async (req, res, next) => {
        var commandInput = `Get-VMStatus -VMId ${req.body.vmId} -VirtualizationServerName ${req.body.virtualizationServer}`
        executePowerShell(commandInput);
    });

    router.get('/setvmstatus', async (req, res, next) => {
        var commandInput = `Set-VMStatus -VMId ${req.body.vmId} -VirtualizationServerName ${req.body.virtualizationServer} -VMStatus ${req.body.status}`
        executePowerShell(commandInput);
    });

    router.get('/setvmconfig', async (req, res, next) => {
        if(req.body.ram != null) {
            var commandInput = `Update-VMMemory -VMId ${req.body.vmId} -VirtualizationServerName ${req.body.virtualizationServer} -NewVMRam ${req.body.ram}`
            executePowerShell(commandInput);
        }

        if(req.body.cpu != null) {
            var commandInput = `Update-VMVCPU -VMId ${req.body.vmId} -VirtualizationServerName ${req.body.virtualizationServer} -NewVMVCPU ${req.body.cpu}`
            executePowerShell(commandInput);
        }

        if(req.body.disk != null) {
            var commandInput = `Expand-VMDiskSize -DiskPath ${req.body.disk} -VirtualizationServerName ${req.body.virtualizationServer} -SetMaxSize ${req.body.size}`
            executePowerShell(commandInput);
        }
    });

    //Ne fonctionne pas encore...
    router.get('/getmonitoringmode', async (req, res, next) => {
        var commandInput = `Get-MonitoringMode -VMId ${req.body.vmId}`
        executePowerShell(commandInput);
    });

    //Ne fonctionne pas encore...
    router.get('/setmonitoringmode', async (req, res, next) => {
        var commandInput = `Update-MonitoringMode -VMId ${req.body.vmId} -isMonitored ${req.body.monitoring} -VirutalizationServerName ${req.body.virtualizationServer}`
        executePowerShell(commandInput);
    })

    //Ne fonctionne pas encore...
    router.get('/getmonitoringdata', async (req, res, next) => {
        var commandInput = `Get-MonitoringData  -VMId ${req.body.vmId} -VirtualizationServerName ${req.body.virtualizationServer}`
        executePowerShell(commandInput);
    });

    return router;
}

module.exports = createRouter;