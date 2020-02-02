#!/bin/bash
set -e

echo "> Reset..."

echo "> Remove assets folder..."
rm -rf dist/user/themes/grav-solid/assets

# remove auto generate files...

echo "> Remove node_modules folder..."
rm -rf node_modules

echo "> Remove package-lock.json..."
rm -rf package-lock.json

echo "> Install dependencies..."
npm i

echo "> Done."
