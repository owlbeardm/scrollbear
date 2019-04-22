#!/bin/bash
set -e

npm version $GIT_TAG_VERSION --no-git-tag-version

git config --global user.email "build@travis-ci.com"
git config --global user.name "Travis CI"

git checkout $TRAVIS_BRANCH

git add -A

git commit -m "Setting version to $GIT_TAG_VERSION"
git tag v$GIT_TAG_VERSION -a -m "Tagging version v$GIT_TAG_VERSION"

git push origin $TRAVIS_BRANCH 2>&1
git push origin $TRAVIS_BRANCH --tags 2>&1
