#!/usr/bin/env bash

# ------------------------------------------------------------------------------ PREPARE

# Chemin vers composer dans strider
composerPath="/usr/local/bin/composer.phar";

# Fallback sur les autres env, il faut par contre que composer soit dans le PATH
if [ ! -f $composerPath ];
then
  composerPath="composer"
fi

# Le fichier de log pour afficher les erreurs
logFile="composer-install.log"

# Tout exécuter depuis le dossier php de base
#basePath=$1;
basePath=dist/
cd $basePath;

# ------------------------------------------------------------------------------ FUNCTIONS

# Lancer une installation composer dans le dossier $composerFolder
function composerInstall ()
{
  echo "> Installing dependencies for $basePath$composerFolder"

  # Aller dans le dossier de l'install et supprimer le dossier vendor
  cd $composerFolder &> /dev/null
  rm -rf "vendor"

  # Exécuter la commande composer et récupérer chaque ligne
  ${composerPath} install --no-progress --no-suggest --no-interaction >> $logFile 2>&1

  # Vérifier si tout s'est bien passé
  if ! [ $? -eq 0 ];
  then
    # Il y a eu une erreur, on affiche le log
    echo "An error happened while installing composer dependencies"
    cat $logFile
    exit 1
  fi

  # On est bons !
  echo "> Done !"
  echo ""

  # Important : Retourner au dossier de base
  cd - &> /dev/null
}


# ------------------------------------------------------------------------------ INSTALL DEPENDENCIES

# Le dossier vers les plugins
pluginsFolder="user/plugins/";

# Vérifier si le dossier des plugins existe
if [ ! -d $pluginsFolder ];
then
  echo "Not a valid Grav installation folder (no plugins directory)"; # TODO : Better message
  exit;
fi

# Vérifier si composer.json existe
if [ ! -f "./composer.json" ];
then
  echo "Not a valid Grav installation folder (no composer.json detected)"; # TODO : Better message
  exit;
fi

# Message car ça peut être long
echo ""
echo "Installing composer dependencies can be long for the first time."
echo ""

# Lancer l'installation composer sur la racine
composerFolder=".";
composerInstall;

# Parcourir les dossiers des plugins
for composerFolder in $pluginsFolder* ;
do
  # Le chemin vers le fichier composer.json hypothétique
  filePath=$composerFolder"/composer.json";

  # Si ce fichier existe
  if [ -f $filePath ];
  then
    # Lancer l'installation composer
    composerInstall;
  fi
done

# Supprimer le fichier de log
rm -rf $logFile