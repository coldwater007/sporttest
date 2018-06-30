//登陆请求逻辑
const models =require('../DB_model/model.js');

//管理员登陆验证

var tea_login = async (ctx, next) =>
{
    //获取post数据
    var id = ctx.request.body.id || '';
    var password = ctx.request.body.password || '';

    console.log(`id: ${id}, password: ${password}`);
    //验证
    var administrator=models.adminnistrator;//获取load模型
    //数据库查询
    const result=await  administrator.find({where: { id: id,password:password}}).catch(
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
                "message":"验证成功"
            };
    }
    else
    {
        ctx.response.body=
            {
                "state":"bad",
                "message":"验证失败"
            };
    }
};

module.exports =
    {

        'POST /tea_login': tea_login
    };