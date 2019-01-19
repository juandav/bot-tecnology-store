import { Scrap } from './scrap';
import Connect from './model/connect';
import { Products, ProductLang, ProductShop } from './model';

const insertProducts = Symbol('insertProducts');

class DBFeeder {
  constructor() {
    try {
      this.scrap = new Scrap(); // products => obj.init().then( data => console.log(data) );
      this.products = null;
      this.sequelize = Connect.getInstance();
    } catch (error) {
      console.error(`DBFeeder ${error.message}`);
    }
  }
  [insertProducts](product) {
    this.sequelize.sync()
    .then(() => Products.create({
      "id_tax_rules_group": "1",
      "reference": product.code,
      "date_add": new Date(),
      "date_upd": new Date(),
      "price": product.price,
    }))
    .then(productRow => {
      const rowInserted = productRow.toJSON();
      return ProductLang.create({
        "id_product": rowInserted.id_product,
        "id_shop": "1",
        "id_lang": "1",
        "name": product.description,
      })
    })
    .then(productLangRow => {
      const rowInserted = productLangRow.toJSON();
      return ProductShop.create({
        "id_product": rowInserted.id_product,
        "id_shop": "1",
        "id_category_default": "2",
        "id_tax_rules_group": "1",
        "date_add": new Date(), 
        "date_upd": new Date(),
      })
      .then(_ => {
        console.log("Success Insert on DB");
      });
    });
  }
  init() {
    this.products = this.scrap.init();
    this.products.then(products => {
      // console.log(products)
      products.forEach(product => {
        this[insertProducts](product);
      })
    });
    // ps_product, ps_product_lang, ps_category_product, ps_product_shop, ps_stock_available
  }
}

const feederInstance = new DBFeeder(); 
export { feederInstance };

// INSERT INTO `tecnimano`.`ps_stock_available` (`id_product`, `id_product_attribute`, `id_shop`, `id_shop_group`) VALUES ('56', '0', '1', '0');
// INSERT INTO `tecnimano`.`ps_product_shop` (`id_product`, `id_shop`, `id_category_default`, `id_tax_rules_group`, `date_add`, `date_upd`) VALUES ('56', '1', '2', '1', '2018-12-06 10:56:42', '2018-12-06 10:56:42');
