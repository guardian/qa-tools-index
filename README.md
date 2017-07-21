# Editorial Tools Index

An index of all the Tools owned by Editorial Tools.

See it in action [here](https://tools-gutools-co-uk.s3-eu-west-1.amazonaws.com/index.html).

## How it works
A static file in S3, generated in CI using `tools.json` as the list of Tools. The static file is generated during build.

### Running locally
- `npm install`
- `grunt`


## Add a Tool
Edit [`tools.json`](./tools.json).

A Tool has the following definition:
- `name`: _STRING_ the Tool name
- `description`: _STRING_ a description of the Tool
- `prod`: _STRING_ the url to the PROD environment
- `code`: _STRING_ (optional) the url to the CODE environment
- `keywords`: _ARRAY[STRING]_ (optional) a set of keywords for search

## Deploying
Merge to master.
