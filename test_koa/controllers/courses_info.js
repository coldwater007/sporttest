/*
查询所有可选课程
分页方式每次返回10条课程信息

 */

const models =require('../DB_model/model.js');

var courses_info = async (ctx, next) =>
{

    var offset = ctx.request.body.offset || '';
    var offset=offset*10;//每次跳过10个
    var course=models.course;//获取course模型
    //数据库分页查询   每次上限10条   offset指定偏移量
    const results=await course.findAll({limit:10,offset:offset}).catch(
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
                "message":JSON.stringify(results)   //将课程信息数组解析成Json返回
            };

    }
    else
    {
        ctx.response.body=
            {
                "state":"bad",
                "message":"未查到课程数据"
            };
    }


};

module.exports =
    {

        'POST /courses_info': courses_info
    };