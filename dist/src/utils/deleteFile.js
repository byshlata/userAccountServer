"use strict";
exports.__esModule = true;
exports.deleteFile = void 0;
var enums_1 = require("../enums");
var fs = require('fs');
var deleteFile = function (file) {
    fs.unlink("".concat(enums_1.CloudPath.helpFolder, "/").concat(file), function (err) {
        if (err) {
            throw err;
        }
    });
};
exports.deleteFile = deleteFile;
//# sourceMappingURL=deleteFile.js.map