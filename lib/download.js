var wget = require('download');
var path = require("path")
var fs = require('fs')
const StreamZip = require('node-stream-zip');
var fsex = require("fs-extra");

/**
 * @param {String} repo
 * @param {String} dest
 * @param {Function} fn
 */

function download(repo, dest, fn) {
    let url = `http://arsizes.com/template/zip/${repo}.zip`
    wget(url, dest, { extract: true, strip: 1 }).then(function () {
        console.log('...')
        fn();
    }).catch(function (err) {
        fn(err);
    });
}

function downloadCustom(repo, dest, fn) {
    wget(repo, dest, { extract: true, strip: 1 }).then(function () {
        console.log('...')
        fn();
    }).catch(function (err) {
        fn(err);
    });
}

function downLocal(repo, dest, fn) {
    if (!fs.existsSync(repo)) {
        fn("该模板不存在")
        return
    }
    // 解压
    const zip = new StreamZip({
        file: repo,
        storeEntries: true
    });
    let basename = path.basename(repo, path.extname(repo))
    zip.on('ready', () => {
        zip.extract(null, path.resolve(__dirname, './'), err => {
            console.log(err ? 'Extract error' : 'Extracted');
            zip.close();
            walkSync(path.resolve(__dirname, `./${basename}`), (filepath, stat) => {
                fsex.moveSync(filepath, `.${filepath.split(`${basename}`)[1]}`, { overwrite: true });
            })

            fn()
        });
    });

}

// 遍历文件夹
function walkSync(currentDirPath, callback) {
    var fs = require('fs'),
        path = require('path');
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });

}

/**
 * Expose `download`.
 */

module.exports = {
    download,
    downloadCustom,
    downLocal
}
