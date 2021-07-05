const path = require("path")
const chalk = require('chalk')
const fs = require("fs")

function listTm() {
    let jsonpath = path.resolve(__dirname, '../tempfile.json')
    let exists = fs.existsSync(jsonpath)
    let filelist = require(jsonpath)
    if (exists) {
        console.log(chalk.cyan("Template List(Local):"))
        filelist.template.map((item, index) => {
            console.log(chalk.white(`(${index + 1})`), chalk.blueBright(`[${item.name}]:`), chalk.green(`${item.url}`))
            console.log(chalk.yellow(`    Describe：${item.des}`))
        })
    } else {
        console.log("👻 暂无可用模板,请先添加")
    }
}

module.exports = listTm