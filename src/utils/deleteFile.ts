import { CloudPath } from "../enums";

const fs = require('fs')

export const deleteFile = (file: string) => {
    fs.unlink(`${CloudPath.helpFolder}/${file}`, (err: Error) => {
        if(err) {
            throw err;
        }
    });
}

