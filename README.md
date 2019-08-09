# QA Tools Index

An index of all the Tools owned by the QA Team. Lovingly ripped off from the ed-tools-index.

## How it works
A static file in S3, generated in CI using `tools.json` as the list of Tools. The static file is generated during build.

### Running locally
- `npm install`
- `grunt`


## Adding Tools
Edit [`tools.json`](./tools.json).

A Tool has the following definition:
- `name`: _STRING_ the Tool name
- `description`: _STRING_ a description of the Tool
- `prod`: _STRING_ the url to the PROD environment
- `code`: _STRING_ (optional) the url to the CODE environment
- `repository`: _STRING_ (optional) the url to the (GitHub) repository
- `keywords`: _ARRAY[STRING]_ (optional) a set of keywords for search

## Deploying
Merge to master.
