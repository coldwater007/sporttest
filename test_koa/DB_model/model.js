/*
通过Sequelize对象
创建相应的表格模型
并以module.exports方式导出

 */
const Sequelize = require('sequelize');  //加载Sequelize模块
const mysequelize=require('../DB_config/config');//mysql数据库连接对象

console.log('加载数据库连接...');

//建立一个 ORM 实体模型    学生登陆表
var load = mysequelize.define('load', {
    loadid: {
        type: Sequelize.STRING(),
        primaryKey: true
    },
    password: Sequelize.STRING()

}, {
    timestamps: false
});

var administrator = mysequelize.define('administrator', {
    id: {
        type: Sequelize.STRING(),
        primaryKey: true
    },
    password: Sequelize.STRING()

}, {
    timestamps: false
});

var student = mysequelize.define('student', {
    sno: {
        type: Sequelize.STRING(),
        primaryKey: true
    },
    sname:Sequelize.STRING(),
    ssex:Sequelize.STRING(),
    snation:Sequelize.STRING(),
    sdepartment:Sequelize.STRING(),
    sclass:Sequelize.STRING(),
    sgrade:Sequelize.STRING(),
    sbirth:Sequelize.STRING(),
    sendurance:Sequelize.STRING(),
    spower:Sequelize.STRING(),
    sspeed:Sequelize.STRING(),
    state:Sequelize.STRING(),
    point:Sequelize.STRING(),
    email: Sequelize.STRING()

}, {
    timestamps: false
});


//导出这些表格映射模型
module.exports=
    {
        'load':load,
        'adminnistrator':administrator,
        'student':student
    };
