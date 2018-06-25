

const sequelize=require('./DB_config/config');

console.log('加载数据库连接...');



//建立一个 ORM 实体模型    学生登陆表
var Load = sequelize.define('loadid', {
    loadid: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    password: Sequelize.STRING(100)

}, {
    timestamps: false
});

model.exports=Load;