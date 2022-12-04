"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var enums_1 = require("../../enums");
var utils_1 = require("../../utils");
var repository_1 = require("../repository");
var format = require("util").format;
var Storage = require("@google-cloud/storage").Storage;
var storage = new Storage({ keyFilename: "google-cloud-key.json" });
var bucket = storage.bucket("diskcloudtest");
var processFile = require('../../utils/upload');
var router = express_1["default"].Router();
router.post("".concat(enums_1.Path.Root), utils_1.checkAuth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, lastName, firstName, prefix_1, blob, blobStream, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, lastName = _a.lastName, firstName = _a.firstName;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, processFile(req, res)];
            case 2:
                _b.sent();
                if (!req.file) {
                    return [2 /*return*/, res.status(400).send({ message: "Please upload a file!" })];
                }
                prefix_1 = (0, utils_1.createPrefix)();
                blob = bucket.file(email + prefix_1);
                blobStream = blob.createWriteStream({
                    metadata: {
                        contentType: req.file.mimetype
                    },
                    resumable: false
                });
                blobStream.on("error", function (err) {
                    return res.status(500).send({ message: err.message });
                });
                blobStream.on("finish", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var publicUrl, _a, user;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                publicUrl = format("".concat(enums_1.CloudPath.Cloud, "/").concat(bucket.name, "/").concat(email + prefix_1));
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, bucket.file(email + prefix_1)];
                            case 2:
                                _b.sent();
                                return [3 /*break*/, 4];
                            case 3:
                                _a = _b.sent();
                                return [2 /*return*/, res.status(500).send({
                                        message: "Uploaded the file successfully: ".concat(email, ", but public access is denied!")
                                    })];
                            case 4: return [4 /*yield*/, (0, repository_1.updateUser)({ email: email, firstName: firstName, lastName: lastName, image: publicUrl })];
                            case 5:
                                user = _b.sent();
                                return [2 /*return*/, res.status(200).send({ user: user })];
                        }
                    });
                }); });
                blobStream.end(req.file.buffer);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                return [2 /*return*/, res.status(500).send({ message: "Could not upload the file: ".concat(email) })];
            case 4: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
//# sourceMappingURL=avatarCloud.js.map