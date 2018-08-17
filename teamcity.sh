#!/usr/bin/env bash

NODE_VERSION="8"

CLOUDFRONT_DISTRIBUTION=E16PAH0C37EAGC

BRANCH=$1

nvm() {
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
    nvm use ${NODE_VERSION}
}

build() {
    npm install
    npm run build
}

deploy() {
    aws s3 sync build/ s3://tools-gutools-co-uk

    aws cloudfront create-invalidation \
        --distribution-id ${CLOUDFRONT_DISTRIBUTION} \
        --paths /\*
}

main() {
    nvm
    build

    if [ "$BRANCH" = "master" ]
    then
        deploy
    fi
}

main