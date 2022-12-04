import { CloudPath } from "../enums";
import { downloadFileCloud } from "../utils";

const fs = require('fs')

export const savePNG = async (email: string) => {
    const file = await downloadFileCloud(email)
    fs.writeFileSync(`${CloudPath.helpFolder}/help.png`, file[0])
}

