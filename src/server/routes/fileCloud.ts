import { Path, CloudPath, ErrorMessage } from '../../enums'
import {
    savePNG,
    createPDF,
    checkAuth,
    deleteFolder,
    createFolder,
    createPrefix,
    createName
} from "../../utils";
import express from "express";
import { Empty, ErrorResponseType, UserEmailType, UserResponseType } from "types";
import { getUserByEmail, updateUser } from "../repository";
import { format } from "util";

const router = express.Router();
const { Storage } = require("@google-cloud/storage");
const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const bucket = storage.bucket("diskcloudtest");

router.post<Empty, UserResponseType | ErrorResponseType, UserEmailType, Empty>(`${Path.Root}`, checkAuth, async (req, res) => {
    try {
        const { email } = req.body

        const userByBase = await getUserByEmail(email)
        const nameImage = createName(userByBase?.image)
        if (userByBase && nameImage) {
            createFolder()
            const prefix = createPrefix()
            const namePDF = email + prefix
            await savePNG(nameImage)
            createPDF(namePDF, userByBase.firstName, userByBase.lastName)
            await bucket.upload(`${CloudPath.helpFolder}/${namePDF}.pdf`);
            const publicUrl = format(`${CloudPath.Cloud}/${bucket.name}/${namePDF}.pdf`);
            const user = await updateUser({ email, pdf: publicUrl });
            deleteFolder()
           return  res.status(200).send({ user });
        }
    } catch (error) {
        res.status(500).send({ message: ErrorMessage.UpdateUsers })
    }
});

module.exports = router
