#!/usr/bin/env bash
BRANCH=$1
if [ "$BRANCH" = "master" ]
then
  aws s3 sync build/ s3://tools-gutools-co-uk
fi