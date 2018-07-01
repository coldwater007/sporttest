/*
学生退课
指定学号 Sno  课程号 stno
流程：
在sc表中删除对应记录
在course表中相应课程选择人数中减一

 */


const models =require('../DB_model/model.js');

var course_remove = async (ctx, next) =>
{
    //获取post数据
    var sno = ctx.request.body.sno || '';  //学号
    var stno=ctx.request.body.stno ||'';  //课程号

    var sc=models.sc;//获取sc模型
    var course=models.course;
    //首先查询是否已经选课
    const result=await sc.destroy({where:{Sno:sno}}); //删除学号Sno的选课记录
    const result2=await course.find({where:{ T_no:stno}});
    if(result2!=null)
        await course.update({ T_num:result2.T_num-1 },{ where: { T_no: stno} });  //选择该课程人数-1
    if(result!=0) //说明操作成功
    {
        ctx.response.body=
            {
                "state":"good",
                "message":"退课成功"
            };
    }
    else
    {
        ctx.response.body=
            {
                "state":"bad",
                "message":"退课失败"
            };
    }

};

module.exports =
    {

        'POST /course_remove': course_remove
    };