const fs = require("fs");

exports.writehtml5public = writeHTML5;

function writeHTML5() {

    const filename = process.argv[2]
    fs.writeFileSync(`${process.cwd()}/${filename}`, "<html><body></body></html>");
}

writeHTML5();