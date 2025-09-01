// import { PdfReader } from "https://unpkg.com/pdfreader@latest/dist/index.js";

// document.addEventListener("DOMContentLoaded", () => {
//     const submitButton = document.getElementById("pdf");

//     function getPdfInfo() {
//         const pdfFile = submitButton.value;
//         new PdfReader().parseFileItems(pdfFile, function(err, item){
//           if (item && item.text)
//             console.log(item.text);
//         });
//     }

//     submitButton.addEventListener("click", (e) => {
//         e.preventDefault();
//         getPdfInfo();
//     });
// });

import express from "express";
import fileUpload from "express-fileupload";
import pdfParse from "pdf-parse";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { text } from "stream/consumers";

const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");

pdfjs.GlobalWorkerOptions.workerSrc = new URL('../node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs',import.meta.url,).toString();
pdfjs.GlobalWorkerOptions.standardFontDataUrl = new URL('../node_modules/pdfjs-dist/standard_fonts',import.meta.url,).toString();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(fileUpload());
app.use(express.static('public'));
app.use("/assets", express.static(`${__dirname}/../assets`));

app.get("/", (req, res) => {
    res.sendFile("index.html", { root: __dirname });
});

async function extractWithPositions(pdfBuffer) {
    const uint8Array = new Uint8Array(pdfBuffer);
    const pdf = await pdfjs.getDocument({data: uint8Array, disableFontFace: false}).promise;
    const page = await pdf.getPage(1);
    const textContent = await page.getTextContent();
    
    const items = textContent.items.map(item => ({
        text: item.str,
        x: item.transform[4],
        y: item.transform[5],
        width: item.width,
        height: item.height
    }));
    
    const columns = groupByColumn(items);
    return columns;
}

function groupByColumn(items, tolerance = 40) {
    const columns = {};
    items.forEach(item => {
        const columnKey = Math.round(item.x / tolerance) * tolerance;
        if (item.text != "" && item.text != " ") {
            if (!columns[columnKey]) {
                columns[columnKey] = [];
            }
            columns[columnKey].push(item);
        }
    });
    
    return columns;
}

app.post("/upload", async (req, res) => {
    if (!req.files || !req.files.pdf) {
        return res.status(400).send("No PDF uploaded");
    }
    
    try {
        const data = await extractWithPositions(req.files.pdf.data);
        res.json(data);
    } catch (error) {
        res.status(500).send("Error parsing PDF");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});