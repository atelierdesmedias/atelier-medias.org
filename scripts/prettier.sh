#!/bin/bash
set -e

echo "> Prettier files..."
prettier --write './src/**/**/*.{tsx,ts,jsx,js,scss,css,json}'

echo "> Done."
