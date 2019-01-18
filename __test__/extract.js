const PDFExtract = require('pdf.js-extract').PDFExtract;
const fs = require('fs');
// import {PDFExtract} from 'pdf.js-extract'; // or with typescript
const pdfExtract = new PDFExtract();
const options = {}; /* see below */
pdfExtract.extract("list.pdf", options, (err, data) => {
    if (err) return console.log(err);
    fs.writeFile("./text.json", JSON.stringify(data), function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log("The file was saved!");
    }); 
});