# Script PowerShell de test

Function Add-NewFile {
    Param(
        [Parameter(Mandatory=$true)]
        [String]$VMName,
        [Parameter(Mandatory=$true)]
        [String]$VMUnity,
        [Parameter(Mandatory=$true)]
        [String]$VMRam,
        [Parameter(Mandatory=$true)]
        [String]$VMDiskSize,
        [Parameter(Mandatory=$true)]
        [String]$VMOS
    )

    Process {
        Write-Output "Creating file ...";
        New-Item -Path . -Name "$VMName-TESTFILE.txt" -ItemType "file" -Value "Created with nodejs: $VMName, $VMUnity, $VMRam, $VMDiskSize, $VMOS";
        Write-Output "File created !"
    }
}