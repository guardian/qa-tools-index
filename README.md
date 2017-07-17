# Editorial Tools Index

An index of all the Tools owned by Editorial Tools.

See it in action [here](https://tools-gutools-co-uk.s3-eu-west-1.amazonaws.com/index.html).

## How it works
A static file in S3, generated in CI using `tools.json` as the list of Tools.

## Add a Tool
Run [`add-tool.js`](./add-tool.js) with the following parameters:

- `--name` the Tool name
- `--description` a brief description of the Tool
- `--url` the PROD url to the Tool
-  (optional) `--code-url` the CODE url to the Tool

This will update [`tools.json`](./tools.json).

## Deploying
Merge to master.

## TODO
- [ ] CNAME to get a simpler url
- [ ] use a CloudFront distribution to get an https site
