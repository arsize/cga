const fs = require("fs")
const jsonfile = require("jsonfile")


function reName(file, name) {
    return new Promise(function (resolve, reject) {
        isFileExisted(file).then(res => {
            let package = jsonfile.readFileSync(`./${file}`)
            package.name = name
            fs.writeFileSync(`./${file}`, JSON.stringify(package, null, 2), "utf-8")
            resolve()
        }, err => {
            reject(err)
        })
    })

}

function isFileExisted(fileName) {
    return new Promise(function (resolve, reject) {
        fs.access(fileName, (err) => {
            if (err) {
                reject(err.message);
            } else {
                resolve('existed');
            }
        })
    })
}

module.exports = reName