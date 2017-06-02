# Editorial Tools Index

An index of all the Tools owned by Editorial Tools.

See it in action [here](http://tools.gutools.co.uk.s3-eu-west-1.amazonaws.com/index.html).

## How it works
A static html file in S3 which reads [tools.json](./src/tools.json) using the `Fetch` API.

## Add a Tool
Update [tools.json](./src/tools.json) adding a new object to the top level array.

```json
  {
    "name": "Tool name",
    "description": "Tool description",
    "url": "Tool url",
    "github": "https://github.com/guardian/the-repo",
    "contact": "optional"
  }
```

## Deploying
Get `composer` Janus credentials and run `deploy.sh`.

## TODO
- [ ] set up CI/CD so PR merges get automatically deployed via RiffRaff
- [ ] styling (bootstrap?!)
- [ ] CNAME to get a simpler url
- [ ] use a CloudFront distribution to get an https site
- [ ] profit
