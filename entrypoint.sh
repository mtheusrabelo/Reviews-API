#!/bin/bash

if [ ! -d node_modules ]; then
    echo "Installing dependencies"
    yarn install
fi

if [ "${NODE_ENV}" == "production" ]; then
    echo "Running in production mode"
    yarn run start
else
    echo "Running in debug mode"
    yarn run debug
fi
