const { Storage } = require("@google-cloud/storage");
const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const bucket = storage.bucket("diskcloudtest");

export const downloadFileCloud = async (email: string) => await bucket.file(email).download();
