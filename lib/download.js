var wget = require('download');

/**
 * Expose `download`.
 */

module.exports = download;

const url = `http://arsizes.com/template/zip/${'vue2_default'}.zip`

/**
 * Download GitHub `repo` to `dest` and callback `fn(err)`.
 *
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