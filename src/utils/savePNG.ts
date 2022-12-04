import { CloudPath } from "../enums";
import { downloadFileCloud } from "../utils";

const fs = require('fs')

export const savePNG = async (name: string) => {
    const file = await downloadFileCloud(name)
    fs.writeFileSync(`${CloudPath.helpFolder}/${name}.png`, file[0])
}

