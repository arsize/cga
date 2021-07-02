const inquirer = require('inquirer')
const userList = require("../prompt/inquirerList")
const download = require('download-git-repo')


function create(name) {
    inquirer.prompt(userList).then(answer => {
        console.log(answer)
        console.log("⚙️   Installing CLI plugins. This might take a while2...")
        download('arsize/cgaTemplate#vue2_default', 'teamp', { clone: true }, function (err) {
            console.log(err ? 'Error' : 'Success')
            console.log('err', err)
        })

    })

}

module.exports = create
