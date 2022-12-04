import { CloudPath } from "../enums";
import PDFDocument from "pdfkit";
import fs from "fs";

export const createPDF = (name: string, namePDF: string, firstName: string, lastName: string): void => {
    const doc = new PDFDocument({size: 'A4'});
    doc.pipe(fs.createWriteStream(`${CloudPath.helpFolder}/${namePDF}.pdf`));
    doc
        .fontSize(27)
        .text(`${firstName}`, 100, 100);
    doc
        .fontSize(27)
        .text(`${lastName}`, 100, 150);
    doc
        .image(`${CloudPath.helpFolder}/${name}.png`, {
            fit: [300, 300],
        });
    doc.end()

}
