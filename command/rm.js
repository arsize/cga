const path = require('path')
const fs = require("fs")
const wrightFileList = require('../utils').wrightFileList
function rm(name) {
    let exists = fs.existsSync(path.resolve(__dirname,"../tempfile.json"))
    let filelist = require(path.resolve(__dirname,"../tempfile.json"))
    if (exists) {
        let temp = []
        filelist.template.map(item => {
            if (item.name != name) {
                temp.push(item)
            }
        })
        filelist.template = temp
        wrightFileList(filelist, path.resolve(__dirname, "../tempfile.json"))
    } else {
        console.error("👻 该模板文件不存在")
    }

}

module.exports = rm