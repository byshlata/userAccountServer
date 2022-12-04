"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.createName = exports.createPrefix = exports.deleteFile = exports.createFolder = exports.deleteFolder = exports.createPDF = exports.downloadFileCloud = exports.savePNG = exports.createAuthUserData = exports.decipherToken = exports.sliceToken = exports.throwError = exports.checkAuth = void 0;
var checkAuth_1 = require("./checkAuth");
__createBinding(exports, checkAuth_1, "checkAuth");
var throwError_1 = require("./throwError");
__createBinding(exports, throwError_1, "throwError");
var sliceToken_1 = require("./sliceToken");
__createBinding(exports, sliceToken_1, "sliceToken");
var decipherToken_1 = require("./decipherToken");
__createBinding(exports, decipherToken_1, "decipherToken");
var createAuthUserData_1 = require("./createAuthUserData");
__createBinding(exports, createAuthUserData_1, "createAuthUserData");
var savePNG_1 = require("./savePNG");
__createBinding(exports, savePNG_1, "savePNG");
var downloadFileCloud_1 = require("../utils/downloadFileCloud");
__createBinding(exports, downloadFileCloud_1, "downloadFileCloud");
var createPDF_1 = require("./createPDF");
__createBinding(exports, createPDF_1, "createPDF");
var deleteFolder_1 = require("./deleteFolder");
__createBinding(exports, deleteFolder_1, "deleteFolder");
var createFolder_1 = require("./createFolder");
__createBinding(exports, createFolder_1, "createFolder");
var deleteFile_1 = require("./deleteFile");
__createBinding(exports, deleteFile_1, "deleteFile");
var createPrefix_1 = require("./createPrefix");
__createBinding(exports, createPrefix_1, "createPrefix");
var createName_1 = require("./createName");
__createBinding(exports, createName_1, "createName");
//# sourceMappingURL=index.js.map