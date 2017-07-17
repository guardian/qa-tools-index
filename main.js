#!/usr/bin/env node

const fs = require('fs');
const mkdirp = require('mkdirp');
const cheerio = require('cheerio');

const tools = require('./tools.json');

tools.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
});

const template = fs.readFileSync('./template.html', 'utf8');

const $ = cheerio.load(template);

tools.forEach(tool => {
    const toolId = tool.name.toLowerCase().replace(/ /g, '-');

    const codeHtml = !tool.code
        ? `<span></span>`
        : `<button class="btn btn-secondary" type="button" data-toggle="collapse" data-target="#${toolId}-extras" aria-expanded="false" aria-controls="${toolId}-extras">
                <i class="fa fa-chevron-circle-down"></i>
            </button>
            <div class="collapse" id="${toolId}-extras">
                <div class="card card-block card-extras">
                    <a href="${tool.code}" target="_blank" class="btn btn-secondary">Open CODE</a>
                </div>
            </div>`;

    const toolHtml = `        
        <div class="card" data-tool-id="${toolId}">
          <h3 class="card-header">${tool.name}</h3>
          <div class="card-block">
            <p class="card-text">${tool.description}</p>
            <a href="${tool.prod}" target="_blank" class="btn btn-primary">Open</a>
            ${codeHtml}
          </div>
        </div>
    `;

    $('.tools-list').append(toolHtml);
});


mkdirp('build', (dirErr) => {
    if (dirErr) throw dirErr;

    const builtFile = 'build/index.html';

    fs.writeFile(builtFile, $.html(), (err) => {
        if (err) throw err;
        console.log(`${builtFile} successfully created`);
    });
});

