//登陆请求逻辑
const models =require('../DB_model/model.js');

//学生登陆验证

var stu_login = async (ctx, next) =>
{
    //获取post数据
    var loadid = ctx.request.body.loadid || '';
    var password = ctx.request.body.password || '';

    console.log(`loadid: ${loadid}, password: ${password}`);
    //验证
    var load=models.load;//获取load模型
    //数据库查询
    const result=await  load.find({where: { loadid: loadid,password:password}}).catch(
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

        'POST /stu_login': stu_login
    };