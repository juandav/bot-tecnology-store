import request from 'request';
import fs from 'fs';
import { PDFExtract } from 'pdf.js-extract';

const downloadPdf = Symbol('downloadPdf');
const extract = Symbol('extract');
const parse = Symbol('parse');

export class Scrap {
  constructor() {
    try {
      this.path = process.cwd();
    } catch (error) {
      console.error(`Scrap ${error.message}`);
    }
  }
  // private, step 1
  [downloadPdf]() {
    return new Promise((resolve, reject) => {
      let wStream = fs.createWriteStream(`${this.path}/assets/meta/list.pdf`);
      request
      .get(process.env.URL)
      .on('error', err => reject(err))
      .pipe(wStream);
      wStream.on('finish', () => resolve('The PDF download has been completed'));
    })
  }
  // private, step 2
  [extract]() {
    return new Promise((resolve, reject) => {
      const pdfExtract = new PDFExtract();
      const options = {};
      pdfExtract.extract(`${this.path}/assets/meta/list.pdf`, options, (err, data) => {
        if (err) return reject(err);
        fs.writeFile(`${this.path}/assets/meta/data.json`, JSON.stringify(data), function(err) {
          if(err) {
            return reject(err);
          }
          resolve("The data extraction has completed successfully");
        });
      });
    })  
  }
  // private, step 3
  [parse]() {
    return new Promise((resolve, reject) => {
      resolve('parse OK')
    })
  }
  init() {
    this[downloadPdf]()
    .then(msg => {
      console.log(`step 1: ${msg}`);
      return this[extract]();
    })
    .then(msg => {
      console.log(`step 2: ${msg}`);
      return this[parse]();
    })
    .then(msg => {
      console.log(`step 3: ${msg}`);
    })
    .catch(err => console.error(err))
  }
}