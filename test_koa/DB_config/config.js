const Sequelize = require('sequelize');  //获取Sequelize对象类

var config = {
    database: 'edu_system',
    username: 'root',
    password: '123456',
    host: 'localhost',
    port: 3306
};
//数据库链接相关配置信息

//建立对应数据库的  ORM
var sequelize = new Sequelize(config.database, config.username, config.password,
    {
    host: config.host,
    dialect: 'mysql',
    pool:
        {
            max: 5,
            min: 0,
            idle: 30000
        }
    }
);

module.exports = sequelize;  //暴露数据库链接