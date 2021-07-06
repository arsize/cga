#!/usr/bin/env node

const program = require('commander')
const create = require("../command/create")
const listTm = require("../command/listTm")
const add = require("../command/add")
const rm = require("../command/rm")
const clean = require("../command/clean")
const init = require("../command/init")
const use = require("../command/use")

program
    .version('1.0.5', '-v,--version')
    .command('create')
    .description('create a new project')
    .action(() => {
        create()
    })
program
    .command('list')
    .description('list local template cache')
    .action(() => {
        listTm()
    })
program
    .command("add")
    .description('add local template cache')
    .action(() => {
        add()
    })
program
    .command("rm <temp_name>")
    .description('remove local template cache')
    .action((name) => {
        rm(name)
    })
program
    .command("clean")
    .description('remove all template cache')
    .action(() => {
        clean()
    })
program
    .command("init <url>")
    .description('init project use remote template')
    .action((url) => {
        init(url)
    })
program
    .command("use <template_name>")
    .description('init project use local template')
    .action((temp_name) => {
        use(temp_name)
    })

program.on('--help', function () {
    console.log('');
    console.log('  Examples:');
    console.log('  cga create <project_name>');
    console.log('  cga init <url>')
    console.log('  cga use <temp_name>')
    console.log('  cga add')
    console.log('  cga list')
    console.log('  cga rm <temp_name>')
    console.log('  cga clean')

});

program.parse()
