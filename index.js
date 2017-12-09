const fs = require('fs')
const path = require('path')

const rload = (d, files = []) => {
    fs.readdirSync(d).forEach((file) => {
        let fp = path.join(d, file)
        fs.statSync(fp).isDirectory()
        ?   rload(fp, files)
        :   files.push(fp)
    })
    return files.reduce((p, c) => {
        p[path.parse(c).name] = fs.readFileSync(c, 'utf8')
        return p
    }, {})
}

module.exports = rload

// https://gist.github.com/kethinov/6658166