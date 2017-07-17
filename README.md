# Editorial Tools Index

An index of all the Tools owned by Editorial Tools.

See it in action [here](http://tools.gutools.co.uk.s3-eu-west-1.amazonaws.com/index.html).

## How it works
A static file in S3, generated in CI using `tools.json` as the list of Tools.

## Add a Tool
Update [tools.json](./tools.json) adding a new object to the top level array.

```json
  {
    "id": "my-new-tool",
    "name": "My New Tool",
    "description": "new and shiny",
    "prod": "https://new.gutools.co.uk",
    "code": "https://new.code.dev-gutools.co.uk"
  }
```

## Deploying
Merge to master.

## TODO
- [ ] CNAME to get a simpler url
- [ ] use a CloudFront distribution to get an https site
