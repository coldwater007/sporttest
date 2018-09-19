/*
发布新的课程

 */

const models =require('../DB_model/model.js');


var publish_course = async (ctx, next) =>
{
    //获取post数据

    var place=ctx.request.body.place ;  //测试地点
    var teacher=ctx.request.body.teacher;//老师
    var date=ctx.request.body.date;  //测试日期
    var time=ctx.request.body.time;//具体时间
    var limit=ctx.request.body.limit;//人数上限
    var num=0;//初始选课人数为0
    var course=models.course;//获取通知 news模型
    if(date==null ||time==null || time==''|| limit==null||limit=='')
    {
        ctx.response.body=
            {
                "state":"bad",
                "message":"参数不完整"
            };
        return;
    }
    const result=await course.create({T_place:place,T_teacher:teacher,T_time:date,T_time_course:time,T_limit:limit,T_num:num});
    if(result!=0)
    {
        ctx.response.body=
            {
                "state":"good",
                "message":"发布课程成功"
            };
    }
    else
    {
        ctx.response.body=
            {
                "state":"bad",
                "message":"发布课程失败"
            };
    }



};

module.exports =
    {

        'POST /publish_course': publish_course
    };