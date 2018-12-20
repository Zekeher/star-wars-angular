'use strict'
let fs = require("fs");
var path = require("path");
// Get Image File
function getImageFile(req, res) {
    let imageFile = req.params.name;
    if (imageFile) {
        let path_file = './content/images/' + imageFile;
        fs.exists(path_file, function(exits) {
            if (exits) {
                res.sendFile(path.resolve(path_file));
            } else {
                res.status(200).send("No existe la imagen...");
            }
        });
    }
}

module.exports = { getImageFile };