import Sequelize from 'sequelize';
import Connect from './connect';

const sequelize = Connect.getInstance();

const Products = sequelize.define('ps_product', {
  "id_product": {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  "id_tax_rules_group": Sequelize.INTEGER,
  "reference": Sequelize.STRING,
  "date_add": Sequelize.DATE,
  "date_upd": Sequelize.DATE,
  "price": Sequelize.DECIMAL,
},
{
  "tableName": 'ps_product',
  "timestamps": false
});

export { Products }