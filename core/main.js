require('dotenv').config();
// run app
(() => {
  const { feederInstance } = require('./dbfeeder');
  feederInstance.init();
})();