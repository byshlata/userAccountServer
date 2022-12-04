"use strict";
exports.__esModule = true;
exports.deleteFolder = void 0;
var enums_1 = require("../enums");
var deleteFile_1 = require("./deleteFile");
var fs = require('fs');
var deleteFolder = function () {
    fs.readdir(enums_1.CloudPath.helpFolder, function (err, files) {
        if (err) {
            throw err;
        }
        ;
        files.forEach(function (file) { return (0, deleteFile_1.deleteFile)(file); });
        fs.rmdir(enums_1.CloudPath.helpFolder, function (err) {
            if (err)
                throw err;
        });
    });
};
exports.deleteFolder = deleteFolder;
//# sourceMappingURL=deleteFolder.js.map