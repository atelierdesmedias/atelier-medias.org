#!/bin/bash
set -e

echo "> Start dev task..."
node ./config/tasks/task-dev.js

echo "> Start webpack dev server..."
cross-env NODE_ENV=development webpack-dev-server --config config/webpack/webpack.dev.js
