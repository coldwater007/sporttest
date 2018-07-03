/*
查询是否可以选课
即查询 system_config表中
start_course_choice字段
yes  可以选课    no    不可选课

 */


const models =require('../DB_model/model.js');

var start_course_query= async (ctx, next) =>
{
    //获取post数据
    var sno = ctx.request.body.sno || ''; //学生学号
    var system_config=models.system_config;//获取config模型
    //数据库查询
    var item='start_course_choice';
    const result=await system_config.find({where: { config_item:item}});
    if(result==null)
    {

        ctx.response.body=
            {
                "state":"bad",
                "message":"服务未开启"
            };
    }
    else
    {

        ctx.response.body=
            {
                "state":"good",
                "message":result.config_value
            };
    }
};

module.exports =
    {

        'POST /start_course_query': start_course_query
    };