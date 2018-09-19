/*
获取新闻
分页方式每次返回5条课程信息

 */

const models =require('../DB_model/model.js');

var news_info = async (ctx, next) =>
{

    var offset = ctx.request.body.offset || '';
    var offset=offset*5;//每次跳过10个
    var new_info=models.new_info;//获取course模型
    //数据库分页查询   每次上限5条   offset指定偏移量
    const results=await new_info.findAll({limit:5,offset:offset}).catch(
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
                "message":"获取失败"
            };
    }


};

module.exports =
    {

        'POST /news_info': news_info
    };