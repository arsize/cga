const downloadCustom = require('../lib/download').downloadCustom
const ora = require('ora');
const path = require("path")
const fs = require("fs")
const shell = require('../lib/shell')
const isDirEmpty = require("../utils").isDirEmpty
const spinner = ora('Installing CLI plugins. This might take a while2...')

async function use(temp_name) {
    let isEmpty = await isDirEmpty("./")
    if (!isEmpty) {
        console.log("👻 请确认当前文件夹为空")
        return
    }
    spinner.start()
    let url = selectTemp(temp_name)
    if (!url) return
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
function selectTemp(temp_name) {
    let jsonpath = path.resolve(__dirname, '../tempfile.json')
    let exists = fs.existsSync(jsonpath)
    let filelist = require(jsonpath)
    if (exists) {
        let url = ""
        filelist.template.map(item => {
            item.name = temp_name
            url = item.url
        })
        return url
    } else {
        console.log('👻 请先添加模板')
        return false
    }


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

module.exports = use