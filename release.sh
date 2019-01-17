#!/bin/bash

yarn sitemap
yarn build
git add -A
git commit -am "master prerelease $1"
git tag "v$1"
git push
git checkout gh-pages
git pull
rm *.js
rm *.json
rm *.txt
rm *.png
rm *.css
rm *.svg
rm *.html
cp -a dist/. .
git add -A
git commit -am "release $1"
git tag "v$1-gh"
git push
git checkout master
