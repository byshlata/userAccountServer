import { CloudPath } from "../enums";
import { deleteFile } from "./deleteFile";

const fs = require('fs')

export const deleteFolder = () => {
    fs.readdir(CloudPath.helpFolder, (err: Error, files: string[]) => {
        if(err) {
            throw err
        };
        files.forEach(file => deleteFile(file))
    });


}

