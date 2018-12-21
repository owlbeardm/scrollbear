#!/bin/bash

yarn build
git checkout gh-pages
git pull
rm *.js
cp -a dist/. .
git add -A
git commit -am "release $1"
git push
git checkout master
