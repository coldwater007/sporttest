/*
查看我的已选课程
即在sc表中找到记录
并在course表中返回该课程信息
可能异常
    由于course表的删除导致数据不一致性
    解决方法：删除sc记录  确保一致性

 */

const models =require('../DB_model/model.js');

var my_choice_course = async (ctx, next) =>
{
    //获取post数据
    var sno = ctx.request.body.sno || '';  //学号
    var sc=models.sc;//获取sc模型
    var course=models.course;
    //首先查询是否已经选课

    const result=await sc.find({where:{ Sno:sno}}); //查询选课记录
    if(result==null)
    {
        ctx.response.body=
            {
                "state":"bad",
                "message":"您还未选课"
            };
    }
    else {
        const course_info = await course.find({where: {T_no: result.STno}});
        if(course_info==null)
        {
              await sc.destroy({where:{Sno:sno}}); //删除学号Sno的选课记录
              ctx.response.body=
                {
                    "state":"bad",
                    "message":"您之前所选课程已被取消"
                };

        }
        else
        {
            ctx.response.body=
                {
                    "state":"good",
                    "message":course_info.toJSON()
                };
        }


    }


};

module.exports =
    {

        'POST /my_choice_course': my_choice_course
    };