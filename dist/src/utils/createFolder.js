"use strict";
exports.__esModule = true;
exports.createFolder = void 0;
var enums_1 = require("../enums");
var fs = require('fs');
var createFolder = function () {
    fs.mkdir(enums_1.CloudPath.helpFolder, { recursive: true }, function (err) {
        if (err) {
            throw err;
        }
    });
};
exports.createFolder = createFolder;
//# sourceMappingURL=createFolder.js.map