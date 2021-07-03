const inquirer = require('inquirer')
const userList = require("../prompt/inquirerList")
const download = require('../lib/download')
const ora = require('ora');
const chalk = require('chalk')
const reName = require("../lib/rename")
const shell = require('../lib/shell')
const spinner = ora('Installing CLI plugins. This might take a while2...')

function create(name) {
    inquirer.prompt(userList).then(answer => {
        spinner.start()
        let tempName = handleAnswer(answer)
        download(tempName, "./", function (err) {
            spinner.stop()
            if (err) {
                console.error(err)
                return
            }
            // 后续处理
            Promise.all(task(name)).then(res => {
                console.log(chalk.green("Success"))
                console.log(chalk.green("enjoy! :)"))
            })

        })

    })

}

/**
 * 处理用户选择结果，确定模板
 * @param {object} answer 
 * @returns 
 */
function handleAnswer(answer) {
    let templateName = ""
    if (answer.projectType == 'vue') {
        templateName += answer.checkVersion
        if (answer.modulesCustom == 'default') {
            // vue2 + vue-cli3
            templateName += `_${answer.modulesCustom}`
        }

    } else if (answer.projectType == 'react') {

    }

    return templateName
}

/**
 * 任务流程
 * @param {string} name 
 * @returns 
 */
function task(name) {
    let temp = [
        reName('package.json', name),
        reName('package-lock.json', name),
        shell('npm i')
    ]
    return temp
}

module.exports = create
