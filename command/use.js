const downloadCustom = require('../lib/download').downloadCustom
const downLocal = require('../lib/download').downLocal
const downDir = require('../lib/download').downDir
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
    let url = selectTemp(temp_name)
    if (!url) {
        console.log('👻 请先添加此模板')
        spinner.stop()
        return
    }
    spinner.start()
    checkDownType(url)(url, "./", function (err) {
        spinner.stop()
        if (err) {
            console.error(err)
            return
        }

        delDir(url).then(res => {
            shell('npm i').then(success => {
                console.log(chalk.green("Success 🌱"))
                console.log(chalk.green("enjoy! :)"))
            })
        }, rej => {
            console.log("error :(")
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
            if (item.name == temp_name) {
                url = item.url
            }
        })
        return url
    } else {
        console.log('👻 请先添加模板')
        return false
    }


}

function checkDownType(url) {
    if (url.includes('http:') || url.includes('https:')) {
        return downloadCustom
    } else if (url.includes('.zip')) {
        // zip需要解压 然后move
        return downLocal
    } else {
        //copy
        return downDir
    }

}

// 删除多余的文件
function delDir(url) {
    return new Promise((resovle, reject) => {
        if (checkDownType(url) == 'downLocal') {
            let basename = path.basename(url, path.extname(url))
            fs.rmdirSync(path.resolve(__dirname, `../lib/${basename}`), { recursive: true })
            resovle()
        } else {
            resovle()
        }

    })
}

module.exports = use