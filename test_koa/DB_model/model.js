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
//管理员
var administrator = mysequelize.define('administrator', {
    id: {
        type: Sequelize.STRING(),
        primaryKey: true
    },
    password: Sequelize.STRING()

}, {
    timestamps: false
});

//学生
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

//成绩
var grade = mysequelize.define('grade', {
    id: {
        type: Sequelize.STRING(),
        primaryKey: true
    },
    testtime: {
        type: Sequelize.STRING(),
        primaryKey: true
    },
    name:Sequelize.STRING(),
    sex:Sequelize.STRING(),
    height:Sequelize.STRING(),
    weight:Sequelize.STRING(),
    lung:Sequelize.STRING(),
    frun:Sequelize.STRING(),
    jump:Sequelize.STRING(),
    zuowei:Sequelize.STRING(),
    onerun:Sequelize.STRING(),
    ywqz:Sequelize.STRING(),
    ytxs:Sequelize.STRING(),
    zongfen:Sequelize.STRING(),
    level: Sequelize.STRING(),
    xuejihao:Sequelize.STRING()

}, {
    timestamps: false
});

//课程
var course = mysequelize.define('course', {
    T_no: {
        type: Sequelize.INTEGER() ,
        autoIncrement:1,  //设定每次自增+1
        primaryKey: true  //是一个自增主键
    },

    T_place:Sequelize.STRING(),  //测试地点
    T_teacher:Sequelize.STRING(),  //测试老师
    T_time:Sequelize.DATE(),  //测试时间
    T_time_course:Sequelize.STRING(), //上午 3.4节
    T_limit:Sequelize.INTEGER(), //人数上限
    T_start:Sequelize.STRING(), //开始测试周
    T_num:Sequelize.INTEGER() //当前已选人数

}, {
    timestamps: false
});
//选课模型

var sc = mysequelize.define('sc',
    {
    Sno: {
        type: Sequelize.STRING(),
        primaryKey: true
    },
    STno: {
        type: Sequelize.STRING(),
        primaryKey: true
    },



}, {
    timestamps: false
});




//导出这些表格映射模型
module.exports=
    {
        'load':load,
        'adminnistrator':administrator,
        'student':student,
        'grade':grade,
        'course':course,
        'sc':sc
    };
