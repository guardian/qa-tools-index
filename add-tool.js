#!/usr/bin/env node

const ArgumentParser = require('argparse').ArgumentParser;

const parser = new ArgumentParser();

parser.addArgument('--name', {
    dest: 'name',
    required: true,
    help: 'Tool name'
});

parser.addArgument('--description', {
    dest: 'description',
    required: true,
    help: 'Tool description'
});

parser.addArgument('--url', {
    dest: 'prod',
    required: true,
    help: 'PROD url'
});

parser.addArgument('--code-url', {
    dest: 'code',
    required: false,
    help: 'CODE url'
});

const args = parser.parseArgs();

const newTool = {
    name: args.name,
    description: args.description,
    prod: args.prod
};

if (args.code) {
    newTool.code = args.code
}

const toolsFile = './tools.json';
const tools = require(toolsFile);
tools.push(newTool);

const jsonfile = require('jsonfile');

jsonfile.writeFile(toolsFile, tools, {spaces: 2}, (err) => {
   if (err) throw err;
   console.log(`Updated ${toolsFile}`);
});
