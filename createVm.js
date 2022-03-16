const express = require('express');
const powershell = require('node-powershell');

function createRouter() {
    const router = express.Router();

    router.post('/createvm', async (req, res, next) => {
        console.log(req.body);

        const ps = new powershell.PowerShell();

        await ps.invoke(
            powershell.PowerShell.command`Write-Output 'VM name: ${req.body.vmName} with ${req.body.ram}${req.body.unity} and ${req.body.storage}${req.body.unity} running on ${req.body.os}`
        )
        await ps.dispose();
        // // Start the process
        // let ps = new PowerShell(
        //     "Write-Output 'My vm :'"
        //     // `Write-Output 'VM name: ${req.body.vmName} with ${req.body.ram}${req.body.unity} and ${req.body.storage}${req.body.unity} running on ${req.body.os}`
        //     );
        // // Handle process errors (e.g. powershell not found)
        // ps.on("error", err => {
        //     console.error(err);
        // });
        // // Stdout
        // ps.on("output", data => {
        //     console.log(data);
        // });
    });

    return router;
}

module.exports = createRouter;