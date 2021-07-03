var spawn = require("child_process").spawn;

function run(cmd) {
    return new Promise((resolve, reject) => {
        let ps = null
        switch (cmd) {
            case "npm i":
                ps = spawn(process.platform === "win32" ? "npm.cmd" : "npm", ['install'], { stdio: 'inherit' })
                break;

            default:
                break;
        }
        ps.on("close", function (code) {
            if (code == 0) {
                resolve()
            }
        });
        ps.on("error", function (err) {
            reject()
        })
    })


}


module.exports = run