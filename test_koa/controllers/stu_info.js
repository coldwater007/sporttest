//根据学号查询学生个人信息
const models =require('../DB_model/model.js');

var stu_info = async (ctx, next) =>
{
    //获取post数据
    var sno = ctx.request.body.sno || '';


    console.log(`sno: ${sno}`);

    var student=models.student;//获取student模型
    //数据库查询
    const result=await student.find({where: { sno:sno}}).catch(
        err=>
        {
            ctx.response.body=
                {
                    "state":"bad",
                    "message":"服务未开启"
                };
        }
    );
    if(result!=null)
    {
        console.log(result.toJSON());
        ctx.response.body=
            {
                "state":"good",
                "message":result.toJSON()
            };
    }
    else
    {
        ctx.response.body=
            {
                "state":"bad",
                "message":"未查到该生信息"
            };
    }
};

module.exports =
    {

        'POST /stu_info': stu_info
    };