#!/bin/bash
set -e
ENV_FILE=".env"

# if fist arg is staging
if [[ $1 == "staging" ]]
then
    echo ""
    echo "> Env is staging..."
    ENV_FILE=".env.staging"


# if fist arg is production
elif [[ $1 == "production" ]]
then
    echo ""
      echo "> Env is production..."
      ENV_FILE=".env.production"
# exit
else
    echo ""
    echo "> Env is not valid. Exit."
    exit
fi


echo "> Start prod task..."
node ./config/tasks/task-production.js

echo "> Start webpack build..."
echo "> cross-env  env-cmd -f "${ENV_FILE}" webpack -p --config config/webpack/webpack.prod.js"
cross-env env-cmd -f "${ENV_FILE}" webpack -p --config config/webpack/webpack.prod.js


