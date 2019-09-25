#!/bin/bash
set -e

echo "> Start dev task..."
node ./config/tasks/task-production.js

echo "> Start webpack..."
cross-env NODE_ENV=production webpack --config config/webpack/webpack.prod.js

