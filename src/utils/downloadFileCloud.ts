const { Storage } = require("@google-cloud/storage");
const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const bucket = storage.bucket("diskcloudtest");

export const downloadFileCloud = async (name: string) => await bucket.file(name).download();
