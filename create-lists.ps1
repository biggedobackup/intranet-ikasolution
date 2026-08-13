# ============================================================
# Script de déploiement des listes SharePoint - Intranet IKA
# À lancer dans PowerShell 7 (pwsh)
# ============================================================

param(
    [string]$SiteUrl = "https://ikasolution.sharepoint.com/sites/ikareview",
    [string]$Tenant = "ikasolution.onmicrosoft.com",
    [switch]$RegisterApp,
    [switch]$DeviceLogin
)

Import-Module PnP.PowerShell

# ------------------------------------------------------------
# ETAPE 1 (une seule fois) : enregistrer l'application Entra ID
# ------------------------------------------------------------
if ($RegisterApp) {
    Write-Host "== Enregistrement de l'application Entra ID ==" -ForegroundColor Cyan
    try {
        Register-PnPEntraIDAppForInteractiveLogin `
            -ApplicationName "IKA Intranet PnP" `
            -SharePointDelegatePermissions "AllSites.FullControl" `
            -Tenant $Tenant `
            -Interactive -ErrorAction Stop
        Write-Host "Application enregistree avec succes !" -ForegroundColor Green
    } catch {
        Write-Host "Echec de l'enregistrement : $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}

# ------------------------------------------------------------
# ETAPE 2 : connexion
# ------------------------------------------------------------
Write-Host "== Connexion au site: $SiteUrl ==" -ForegroundColor Cyan
try {
    if ($DeviceLogin) {
        Connect-PnPOnline -Url $SiteUrl -Interactive -ErrorAction Stop
    } else {
        Connect-PnPOnline -Url $SiteUrl -Interactive -ErrorAction Stop
    }
    Write-Host "Connexion reussie !" -ForegroundColor Green
} catch {
    Write-Host "Connexion echouee : $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Si l'erreur indique 'Specified method is not supported' ou 'valid Client id'," -ForegroundColor Yellow
    Write-Host "c'est que l'application Entra ID n'est pas encore enregistree." -ForegroundColor Yellow
    Write-Host "Lance d'abord :" -ForegroundColor Yellow
    Write-Host "  & 'C:\Users\BigGedo\Desktop\DEV\IKASOLUTION\SITEWEB IKA SOLUTION\intranet\spfx-v2\create-lists.ps1' -RegisterApp" -ForegroundColor Cyan
    exit 1
}

$lists = @(
    @{ Title = "Actualites";   Url = "Actualites" },
    @{ Title = "Agenda";       Url = "Agenda" },
    @{ Title = "Annonces";     Url = "Annonces" },
    @{ Title = "Projets";      Url = "Projets" },
    @{ Title = "Galerie";      Url = "Galerie" },
    @{ Title = "Bilans";       Url = "Bilans" },
    @{ Title = "DocumentsIKAR"; Url = "DocumentsIKAR" }
)

Write-Host "`n== Creation des listes ==" -ForegroundColor Cyan
foreach ($l in $lists) {
    $exists = Get-PnPList -Identity $l.Url -ErrorAction SilentlyContinue
    if (-not $exists) {
        New-PnPList -Title $l.Title -Template GenericList -Url $l.Url -EnableVersioning | Out-Null
        Write-Host "  [OK] $($l.Title) creee" -ForegroundColor Green
    } else {
        Write-Host "  [==] $($l.Title) existe deja" -ForegroundColor Yellow
    }
}

Write-Host "`n== Ajout de colonnes (Actualites) ==" -ForegroundColor Cyan
$cols = @(
    @{ Display = "Categorie";  Internal = "Categorie";  Type = "Choice";  Choices = @("DEV","RH","Systeme","Compta","Direction") },
    @{ Display = "DateArticle"; Internal = "DateArticle"; Type = "DateTime" },
    @{ Display = "Auteur";     Internal = "Auteur";     Type = "User" }
)
foreach ($c in $cols) {
    try {
        if ($c.Type -eq "Choice") {
            Add-PnPField -List "Actualites" -DisplayName $c.Display -InternalName $c.Internal -Type $c.Type -Choices $c.Choices -AddToDefaultView -ErrorAction Stop
        } else {
            Add-PnPField -List "Actualites" -DisplayName $c.Display -InternalName $c.Internal -Type $c.Type -AddToDefaultView -ErrorAction Stop
        }
        Write-Host "  [OK] colonne $($c.Display)" -ForegroundColor Green
    } catch {
        Write-Host "  [X] colonne $($c.Display) : $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n== Ajout de colonnes (Agenda) ==" -ForegroundColor Cyan
foreach ($c in @(
    @{ Display = "DateDebut"; Internal = "DateDebut"; Type = "DateTime" },
    @{ Display = "DateFin";   Internal = "DateFin";   Type = "DateTime" },
    @{ Display = "Lieu";      Internal = "Lieu";      Type = "Text" }
)) {
    try {
        Add-PnPField -List "Agenda" -DisplayName $c.Display -InternalName $c.Internal -Type $c.Type -AddToDefaultView | Out-Null
        Write-Host "  [OK] colonne $($c.Display)" -ForegroundColor Green
    } catch {
        Write-Host "  [X] colonne $($c.Display) : $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n== Exemple d'ajout d'elements (3 actualites) ==" -ForegroundColor Cyan
$news = @(
    @{ Title = "Nouvelle charte graphique IKA";  Categorie = "DEV" },
    @{ Title = "Succes du projet IKAR";          Categorie = "Direction" },
    @{ Title = "Afterwork de l'equipe";          Categorie = "RH" }
)
foreach ($n in $news) {
    Add-PnPListItem -List "Actualites" -Values $n | Out-Null
    Write-Host "  [OK] $($n.Title)" -ForegroundColor Green
}

Write-Host "`n== Verification ==" -ForegroundColor Cyan
Get-PnPList | Select-Object Title, ItemCount | Format-Table -AutoSize

Write-Host "`nTermine !" -ForegroundColor Green
