#!/bin/bash
set -e

echo "> Start prod task..."
node ./config/tasks/task-production.js

echo "> Start webpack build..."
cross-env NODE_ENV=production webpack --config config/webpack/webpack.prod.js

