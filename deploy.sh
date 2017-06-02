#!/usr/bin/env bash

aws s3 cp src/ s3://tools.gutools.co.uk \
    --recursive \
    --profile composer
