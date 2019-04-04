#!/usr/bin/env bash

# dev.unosquarebelfast.com

npm i && \
npm run build && \
aws s3 sync dist/ s3://dev.unosquarebelfast.com --delete 