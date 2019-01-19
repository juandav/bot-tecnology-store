import Sequelize from 'sequelize';

const Connect = (function () {
  let instance;
 
  function createInstance() {
    const sequelize = new Sequelize(
      process.env.MYSQL_DATABASE, 
      process.env.MYSQL_USERNAME, 
      process.env.MYSQL_PASSWORD, 
      {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        },
        // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
        operatorsAliases: false
      }
    );
    return sequelize;
  }
 
  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

module.exports = Connect;