import express from "express";
import {
    Empty,
    ErrorResponseType,
    UserResponseType,
    UsersUpdateType
} from "types";
import { Path, CloudPath } from '../../enums'
import { checkAuth, createPrefix } from "../../utils";
import { updateUser } from "../repository";

const { format } = require("util");
const { Storage } = require("@google-cloud/storage");
const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const bucket = storage.bucket("diskcloudtest");
const processFile = require('../../utils/upload')
const router = express.Router();

router.post<Empty, UserResponseType | ErrorResponseType, UsersUpdateType, Empty>(`${Path.Root}`, checkAuth, async (req: any, res) => {
    const { email, lastName, firstName } = req.body
    try {
        await processFile(req, res);
        if (!req.file) {
            return res.status(400).send({ message: "Please upload a file!" });
        }
        const prefix = createPrefix()
        const blob = bucket.file(email+prefix);
        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype,
            },
            resumable: false,
        });
        blobStream.on("error", (err: Error) => {
            return res.status(500).send({ message: err.message });
        });
        blobStream.on("finish", async () => {
            const publicUrl = format(
                `${CloudPath.Cloud}/${bucket.name}/${email+prefix}`
            );
            try {
               await bucket.file(email+prefix);
            } catch {
                return res.status(500).send({
                    message:
                        `Uploaded the file successfully: ${email}, but public access is denied!`,
                });
            }
            const user = await updateUser({email, firstName, lastName, image: publicUrl })
            return res.status(200).send({user});
        });

        blobStream.end(req.file.buffer);
    } catch (error) {
        return res.status(500).send({ message: `Could not upload the file: ${email}` });
    }
});

module.exports = router
