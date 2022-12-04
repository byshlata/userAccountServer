"use strict";
var cloudinary = require('cloudinary').v2;
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KAY_CLOUD,
    api_secret: process.env.API_SECRET_CLOUD
});
exports.uploads = function (file) {
    return new Promise(function (resolve) {
        cloudinary.uploader.upload(file, function (result) {
            resolve({ url: result.url, id: result.public_id });
        }, { resource_type: "auto" });
    });
};
//# sourceMappingURL=cloudinary.js.map