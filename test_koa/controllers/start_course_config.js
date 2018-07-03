/*
管理员设定是否开启选课
传入参数 administrator  config_value (yes/no)

*/


const models =require('../DB_model/model.js');

var start_course_config= async (ctx, next) =>
{
    //获取post数据
    var administartor = ctx.request.body.adminnistrator ; //学生学号
    var config_value=ctx.request.body.config_value;
    if(config_value!='yes' && config_value!='no')
    {
        ctx.response.body=
            {
                "state":"bad",
                "message":"参数错误"
            };
        return;
    }
    var system_config=models.system_config;//获取config模型
    //数据库查询
    var item='start_course_choice';
    const result=await system_config.update({config_value:config_value},{where: { config_item:item}});
    const rs=await  system_config.find({where:{config_item:item}});
    if(rs!=null)
    {
        if(rs.config_value=='yes')
        {
            ctx.response.body=
                {
                    "state":"good",
                    "message":"选课已开启"
                };
        }
        else
        {
            ctx.response.body=
                {
                    "state":"good",
                    "message":"选课已关闭"
                };
        }
    }
    else
    {
        ctx.response.body=
            {
                "state":"bad",
                "message":"配置出错"
            };
    }

};

module.exports =
    {

        'POST /start_course_config': start_course_config
    };