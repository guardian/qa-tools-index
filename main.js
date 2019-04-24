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

function getIndexHtml() {
    const $ = cheerio.load(template);

    tools.forEach(tool => {
        const toolId = tool.name.toLowerCase().replace(/ /g, '-');

        const keywords = tool.keywords || [];

        const codeHtml = !tool.code
            ? `<span></span>`
            : `<a href="${tool.code}" target="_blank" class="btn btn-secondary">Open CODE</a>`;
        const repositoryHtml = !tool.repository
            ? `<span></span>`
            : `<a href="${tool.repository}" target="_blank" class="btn btn-secondary">Open Repository</a>`;

        const prodLogs = !tool.prodLogs
            ? `<span></span>`
            : `<a href="${tool.prodLogs}" target="_blank" class="btn btn-secondary">Open PROD logs</a>`;
        const codeLogs = !tool.codeLogs
            ? `<span></span>`
            : `<a href="${tool.codeLogs}" target="_blank" class="btn btn-secondary">Open CODE logs</a>`;

        const janusLink = !tool.awsAccount
            ? `<span></span>`
            : `<a href="https://janus.gutools.co.uk/consoleUrl?permissionId=${tool.awsAccount}-dev" target="_blank" class="btn btn-secondary">Open AWS account (via Janus)</a>`;

        const extrasHtml = !tool.code && !tool.repository
            ? `<span></span>`
            : `<button class="btn btn-secondary" type="button" data-toggle="collapse" data-target="#${toolId}-extras" aria-expanded="false" aria-controls="${toolId}-extras">
                    <i class="fa fa-chevron-circle-down"></i>
               </button>
               <div class="collapse" id="${toolId}-extras">
                 <div class="card card-block card-extras">
                   ${codeHtml}
                   ${repositoryHtml}
                   ${prodLogs}
                   ${codeLogs}
                   ${janusLink}
                 </div>
               </div>`;

        const toolHtml = `        
          <div class="card editorial-tool" data-tool-id="${toolId}" data-tool-keywords='${JSON.stringify(keywords)}'">
              <h3 class="card-header">${tool.name}</h3>
              <div class="card-block">
                <p class="card-text">${tool.description}</p>
                <a href="${tool.prod}" target="_blank" class="btn btn-primary">Open</a>
                ${extrasHtml}
              </div>
          </div>
        `;

        $('.tools-list').append(toolHtml);
    });

    return $;
}

function getCodeHtml() {
    const $ = cheerio.load(template);

    tools.filter(_ => _.code).forEach(tool => {
        const toolId = tool.name.toLowerCase().replace(/ /g, '-');

        const keywords = tool.keywords || [];

        const repositoryHtml = !tool.repository
            ? `<span></span>`
            : `<a href="${tool.repository}" target="_blank" class="btn btn-secondary">Open Repository</a>`;

        const toolHtml = `        
          <div class="card editorial-tool" data-tool-id="${toolId}" data-tool-keywords='${JSON.stringify(keywords)}'">
              <h3 class="card-header">${tool.name}</h3>
              <div class="card-block">
                <p class="card-text">${tool.description}</p>
                <a href="${tool.code}" target="_blank" class="btn btn-primary">Open CODE</a>
                <button class="btn btn-secondary" type="button" data-toggle="collapse" data-target="#${toolId}-extras" aria-expanded="false" aria-controls="${toolId}-extras">
                    <i class="fa fa-chevron-circle-down"></i>
               </button>
               <div class="collapse" id="${toolId}-extras">
                 <div class="card card-block card-extras">
                   ${repositoryHtml}
                 </div>
               </div>
              </div>
          </div>
        `;

        $('.tools-list').append(toolHtml);
    });

    return $;
}

mkdirp('build', (dirErr) => {
    if (dirErr) throw dirErr;

    const indexHtml = getIndexHtml();
    const indexFile = 'build/index.html';

    fs.writeFile(indexFile, indexHtml.html(), (err) => {
        if (err) throw err;
        console.log(`${indexFile} successfully created`);
    });

    const codeHtml = getCodeHtml();
    const codeFile = 'build/code.html';

    fs.writeFile(codeFile, codeHtml.html(), (err) => {
        if (err) throw err;
        console.log(`${codeFile} successfully created`);
    });
});

