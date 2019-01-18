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
      wStream.on('finish', () => resolve('The PDF download has been completed.'));
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
          resolve({
            msg: "The data extraction has completed successfully.",
            data: JSON.stringify(data),
          });
        });
      });
    })  
  }
  // private, step 3
  [parse](data) {
    // pages:array -> page:object -> content:object
    // aca revisar algun patron 7 el cosigo de inicio
    return new Promise((resolve, reject) => {
      try {
        const dataJson = JSON.parse(data);
        let dataParsed = [];
        dataJson['pages'].forEach(pages => {
          const content = pages.content;
          content.forEach(el => {
            let value = el.str;
            if (value.charAt(0) == '7' && value.length == 5) {
              let index = content.indexOf(el);
              let deviceInfo = {
                "code": value,
                "description": content[index + 1]['str'],
                "price": content[index + 2]['str'] + content[index + 3]['str'],
              }
              dataParsed.push(deviceInfo);
            }
          })
        });
        resolve({
          msg: "the data has been parsed successfully.",
          dataParsed,
        });
      } catch (error) {
        reject(error.message)
      }
    });
  }
  init() {
    return this[downloadPdf]()
    .then(msg => {
      console.log(`step 1: ${msg}`);
      return this[extract]();
    })
    .then(({ msg, data }) => {
      console.log(`step 2: ${msg}`);
      return this[parse](data);
    })
    .then(({ msg, dataParsed }) => {
      console.log(`step 3: ${msg}`);
      return dataParsed
    })
    .catch(err => console.error(err))
  }
}