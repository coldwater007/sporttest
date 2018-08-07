/*
系统数据库连接配置
并导出Sequelize对象

 */


const Sequelize = require('sequelize');  //获取Sequelize对象类

var config = {
    database: 'edu_system',
    username: 'zek',
    password: '123',
    host: '101.236.30.248',
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
console.log(`连接到数据库 ${config.host} ${config.database}...`);

module.exports = sequelize;  //导出数据库链接