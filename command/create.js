const inquirer = require('inquirer')
const userList = require("../prompt/inquirerList")
const download = require('../lib/download').download
const ora = require('ora');
const chalk = require('chalk')
const reName = require("../lib/rename")
const shell = require('../lib/shell')
const isDirEmpty = require("../utils").isDirEmpty
const spinner = ora('Installing CLI plugins. This might take a while2...')

async function create() {
    let isEmpty = await isDirEmpty("./")
    if (!isEmpty) {
        console.log("👻 请确认当前文件夹为空")
        return
    }

    inquirer.prompt(userList).then(answer => {
        let tempName = handleAnswer(answer)
        if (!tempName) {
            // 暂未开放的模板选项
            spinner.stop()
            return
        }
        spinner.start()
        download(tempName, "./", function (err) {
            spinner.stop()
            if (err) {
                console.error(err)
                return
            }
            // 后续处理
            Promise.all(task()).then(res => {
                console.log(chalk.green("Success 🌱"))
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
        } else {
            // TODO:自定义搭配
            console.log("👻 暂未开放，请稍后")
            return false
        }

    } else if (answer.projectType == 'react') {
        if (answer.modulesCustom == 'default') {
            // react + create-react-app
            templateName += answer.projectType + `_cra_` + answer.modulesCustom
        } else {
            // TODO:自定义搭配
            console.log("👻 暂未开放，请稍后")
            return false
        }

    } else {
        console.log("👻 暂未开放，请稍后")
        return false
    }

    return templateName
}

/**
 * 任务流程
 * @param {string} name 
 * @returns 
 */
function task() {
    let temp = [
        shell('npm i'),
    ]
    return temp
}

module.exports = create
