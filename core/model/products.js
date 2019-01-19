import Sequelize from 'sequelize';
import Connect from './connect';

const sequelize = Connect.getInstance();

// INSERT INTO `tecnimano`.`ps_product` (`id_tax_rules_group`, `reference`, `date_add`, `date_upd`) VALUES ('1', 'TEST', '2018-12-06 10:56:42', '2018-12-06 22:45:28');
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