#!/usr/bin/env node

const program = require('commander')
const create = require("../command/create")

program
    .version('0.0.1', '-v,--version')
    .command('create <name>')
    .description('create a new project')
    .action((name,) => {
        create(name)
    })

program.on('--help', function () {
    console.log('  Examples:');
    console.log('');
    console.log('  cga create <project_name>');
    console.log('');
    console.log('  cga init -t <url>')
    console.log('');
    console.log('  cga add -t')
    console.log('');
    console.log('  cga list')
    console.log('');
    console.log('  cga rm <temp_name>')
    console.log('');
    console.log('  cga init -lt <temp_name>')
});

program.parse()
