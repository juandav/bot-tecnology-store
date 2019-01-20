import Sequelize from 'sequelize';
import Connect from './connect';

const sequelize = Connect.getInstance();

const ProductShop = sequelize.define('ps_product_shop', {
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
  "id_category_default": Sequelize.INTEGER,
  "id_tax_rules_group": Sequelize.INTEGER,
  "price": Sequelize.DECIMAL,
  "date_add": Sequelize.DATE, 
  "date_upd": Sequelize.DATE,
},
{
  "tableName": 'ps_product_shop',
  "timestamps": false
});

export { ProductShop }