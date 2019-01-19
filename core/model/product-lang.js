import Sequelize from 'sequelize';
import Connect from './connect';

const sequelize = Connect.getInstance();

const ProductLang = sequelize.define('ps_product_lang', {
  "id_product": {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: false,
  },
  "id_shop": {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: false,
  },
  "id_lang": {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: false,
  },
  "name": Sequelize.STRING,
},
{
  "tableName": 'ps_product_lang',
  "timestamps": false
});

export { ProductLang }