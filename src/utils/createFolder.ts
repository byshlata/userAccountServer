import { CloudPath } from "../enums";

const fs = require('fs')

export const createFolder = () => {
    fs.mkdir(CloudPath.helpFolder, { recursive: true }, (err: Error) => {
        if(err) {
            throw err;
        }
    });
}
