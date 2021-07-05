
const fs = require('fs')
const json = require('format-json')
const chalk = require('chalk')
function createTable() {
    const Table = require('cli-table')
    const table = new Table({
        head: ['Folder Name', 'Path', 'Go', 'Des'],
        chars: {
            'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
            , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
            , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
            , 'right': '║', 'right-mid': '╢', 'middle': '│'
        },
        style: {
            border: ['grey'],
            head: ['grey']
        }
    })
    return table
}

function getFileList(list) {
    const table = createTable()
    const tableList = Object.keys(list).map(k => {
        const cur = list[k]
        return [k, cur['Path'], chalk.green(cur['Go']), cur['Des']]
    })
    table.push(...tableList)
    console.log(table.toString())
}

function checkFilesList(jsonpath) {
    try {
        fs.statSync(jsonpath)
    } catch (error) {
        let file_descriptor = fs.openSync(jsonpath, 'w')
        fs.writeFileSync(jsonpath, '{"template":[]}')
        fs.closeSync(file_descriptor)
    }
    return require(jsonpath)
}

function wrightFileList(list, jsonpath) {
    fs.writeFile(jsonpath, json.plain(list), 'utf8', err => {
        if (err) {
            console.log('wright fail', err)
        } else {
            console.log(chalk.green('update success!'))
        }
    })
}

function isDirEmpty(dirname) {
    return fs.promises.readdir(dirname).then(files => {
        return files.length === 0;
    });
}

exports.getFileList = getFileList
exports.checkFilesList = checkFilesList
exports.wrightFileList = wrightFileList
exports.isDirEmpty = isDirEmpty