const inquirer = require('inquirer')
const fs = require("fs")
const path = require("path")
const addList = require("../prompt/addList")
const wrightFileList = require('../utils').wrightFileList

function add() {
    inquirer.prompt(addList).then(answer => {
        let exists = fs.existsSync("../tempfile.json")
        let filelist = require("../tempfile.json")
        if (exists) {
            filelist.template.push({
                name: answer.templateName,
                url: answer.templateUrl,
                des: answer.templateDes
            })
            wrightFileList(filelist, path.resolve(__dirname, "../tempfile.json"))
        }
    })

}

module.exports = add