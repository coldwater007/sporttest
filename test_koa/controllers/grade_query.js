/*
成绩查询
指定 Sno（学号） 年份
返回该年成绩的Json串
 */
const models =require('../DB_model/model.js');

var grade_query= async (ctx, next) =>
{
    //获取post数据
    var sno = ctx.request.body.sno || ''; //学生学号
    var testtime=ctx.request.body.testtime||'';//测试年份


    console.log(`sno: ${sno}，testtime:${testtime}`);

    var grade=models.grade;//获取grade模型
    //数据库查询
    const result=await grade.find({where: { id:sno,testtime:testtime}}).catch(
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
                "message":"未查到数据"
            };
    }
};

module.exports =
    {

        'POST /grade_query': grade_query
    };