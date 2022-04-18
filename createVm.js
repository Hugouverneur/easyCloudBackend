const express = require('express');
const powershell = require('node-powershell');
const { exec } = require('child_process');

function createRouter() {
    const router = express.Router();

    // Powershell command test by creating file with vmName
    router.post('/createvm', async (req, res, next) => {
        console.log(req.body);

        // Create Powershell command
        let commandInput = `Write-Output "Creating file ...";
            New-Item -Path . -Name "${req.body.vmName}.txt" -ItemType "file" -Value "Created with nodejs";
            Write-Output "File created !"`;

        // Exec command
        exec(commandInput, {'shell':'powershell.exe'}, (error, data) => {
            if(error) {
                throw error;
            } else {
                console.log(`${data}`);
            }
        });
    });

    return router;
}

module.exports = createRouter;