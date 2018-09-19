/*
删除取消课程
先查询出所有选了该课程学生
删除它们的选课记录
向它们发送邮箱通知
删除该课程

 */

const models =require('../DB_model/model.js');

var del_course = async (ctx, next) =>
{
    //获取post数据

    var tno=ctx.request.body.tno ||'';  //课程号

    var sc=models.sc;//获取sc模型
    var course=models.course;

    const result=await sc.destroy({where:{STno:tno}});
    const result2=await course.destroy({where:{ T_no:tno}});

    if(result!=0 && result2!=0) //说明操作成功
    {
        ctx.response.body=
            {
                "state":"good",
                "message":"操作成功"
            };
    }
    else
    {
        ctx.response.body=
            {
                "state":"bad",
                "message":"操作失败"
            };
    }

};

module.exports =
    {

        'POST /del_course': del_course
    };