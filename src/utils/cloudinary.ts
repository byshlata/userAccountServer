const cloudinary = require('cloudinary').v2;

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KAY_CLOUD,
    api_secret: process.env.API_SECRET_CLOUD
});

exports.uploads = (file: any) =>{
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result: any) =>{
            resolve({url: result.url, id: result.public_id})
        }, {resource_type: "auto"})
    })
}
