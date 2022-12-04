"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.createPDF = void 0;
var enums_1 = require("../enums");
var pdfkit_1 = __importDefault(require("pdfkit"));
var fs_1 = __importDefault(require("fs"));
var createPDF = function (name, namePDF, firstName, lastName) {
    var doc = new pdfkit_1["default"]({ size: 'A4' });
    doc.pipe(fs_1["default"].createWriteStream("".concat(enums_1.CloudPath.helpFolder, "/").concat(namePDF, ".pdf")));
    doc
        .fontSize(27)
        .text("".concat(firstName), 100, 100);
    doc
        .fontSize(27)
        .text("".concat(lastName), 100, 150);
    doc
        .image("".concat(enums_1.CloudPath.helpFolder, "/").concat(name, ".png"), {
        fit: [300, 300]
    });
    doc.end();
};
exports.createPDF = createPDF;
//# sourceMappingURL=createPDF.js.map