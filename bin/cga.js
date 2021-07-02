#!/usr/bin/env node

const program = require('commander')
const create = require("../command/create")

program
    .version('0.0.1', '-v,--version')
    .command('create <name>')
    .description('create a new project')
    .action(name => {
        create(name)
    })

program.parse()
