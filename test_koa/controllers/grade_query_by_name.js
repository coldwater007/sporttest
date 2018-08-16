const models =require('../DB_model/model.js');

var grade_query_by_name= async (ctx, next) =>
{
    //获取post数据
    var sname = ctx.request.body.name || ''; //学生姓名
    var grade=models.grade;//获取grade模型
    //数据库查询
    const results=await grade.findAll({where: { name:sname}}).catch(
        err=>
        {
            ctx.response.body=
                {
                    "state":"bad",
                    "message":"服务未开启"
                };
        }
    );
    if(results!=null)
    {

        ctx.response.body=
            {
                "state":"good",
                "message":JSON.stringify(results)
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

        'POST /grade_query_by_name': grade_query_by_name
    };