if [ ! -d node_modules ]; then
    echo "Installing dependencies"
    npm install --silent
fi

if [ "${NODE_ENV}" == "development" ]; then
    echo "Running in debug mode"
    npm run debug
else
    echo "Running in production mode"
    npm run build
    npm run server
fi
