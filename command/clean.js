const fs = require("fs")
const path = require("path")
const wrightFileList = require('../utils').wrightFileList
function clean() {
    let exists = fs.existsSync(path.resolve(__dirname,"../tempfile.json"))
    let filelist = require(path.resolve(__dirname,"../tempfile.json"))
    if (exists) {
        filelist.template = []
        wrightFileList(filelist, path.resolve(__dirname, "../tempfile.json"))
    } else {
        console.log("👻 暂无可用模板")
    }

}

module.exports = clean