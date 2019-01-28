#!/bin/bash

if [ -z $1 ]; then
        echo "Releasing scrollbear.com into gh-pages branch"
        echo "Missed version"
        echo "Usage: release.sh <release version>"
        exit 1;
fi

echo "Releasing scrollbear.com $1"

git stash
git flow release start $1
yarn sitemap
yarn build
git add -A
git commit -am "prerelease $1"
git flow release publish $1
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
git commit -am "gh-pages release $1"
git tag "v$1-gh"
git push
git flow release finish $1
git push origin --tags
