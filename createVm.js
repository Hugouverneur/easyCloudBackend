const express = require('express');
const { exec, spawn } = require('child_process');
const production =  false;

function createRouter() {
    const router = express.Router();

    router.post('/createvm', async (req, res, next) => {

        if(production) { // Test mode if not in production
            var commandInput = `. ./powershell-scripts/vmDeployment.ps1;
                Add-NewVM -VMName "${req.body.vmName}" -VMRam ${req.body.ram}${req.body.unity} -VMDiskSize ${req.body.storage}${req.body.unity} -VMOS ${req.body.os} -VMProcessor 1`;//VMProcessor todo

        } else {
            var commandInput = `. ./powershell-scripts/testMode.ps1;
                Add-NewFile -VMName "${req.body.vmName}" -VMUnity ${req.body.unity} -VMRam ${req.body.ram} -VMDiskSize ${req.body.storage} -VMOS ${req.body.os}`;

        }

        // Exec command
        exec(commandInput, {'shell':'powershell.exe'}, (error, data) => {
            if(error) {
                console.log(error);
            } else {
                console.log(`${data}`);
            }
        });
    });

    return router;
}

module.exports = createRouter;