const downloadCustom = require('../lib/download').downloadCustom
const ora = require('ora');
const shell = require('../lib/shell')
const isDirEmpty = require("../utils").isDirEmpty
const spinner = ora('Installing CLI plugins. This might take a while2...')

async function init(url) {
    let isEmpty = await isDirEmpty("./")
    if (!isEmpty) {
        console.log("👻 请确认当前文件夹为空")
        return
    }
    spinner.start()
    downloadCustom(url, "./", function (err) {
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

module.exports = init