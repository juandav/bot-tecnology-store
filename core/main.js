require('dotenv').config();
const { Scrap } = require('./scrap');

const obj = new Scrap();
obj.init().then( data => console.log(data) );