/*
管理员发布重要通知
传入参数： administrator   title  content
向数据库做持久化
并向可以选择是否    向所有学生发送邮件通知（如开启选课）
 */

const models =require('../DB_model/model.js');
const sendEmailtoALL=require('../fun_packgae/sendEmailtoALL.js');
const getnowdate=require('../fun_packgae/get_now_date.js');

var news_publish = async (ctx, next) =>
{
    //获取post数据
    var administrator = ctx.request.body.administrator ;  //管理员
    var title=ctx.request.body.title ;  //标题
    var content=ctx.request.body.content;//内容
    var publish_time=getnowdate();//获取当前格式化日期
    var new_info=models.new_info;//获取通知 news模型
    if(content==null || content==''||administrator==null || administrator==''||title==null||title=='')
    {
        ctx.response.body=
            {
                "state":"bad",
                "message":"参数不完整"
            };
        return;
    }
    const result=await new_info.create({title:title,time:publish_time,writer:administrator,content:content});
    if(result!=0)
    {
        ctx.response.body=
            {
                "state":"good",
                "message":"发布通知成功"
            };
    }
    else
    {
        ctx.response.body=
            {
                "state":"bad",
                "message":"发布通知失败"
            };
    }



};

module.exports =
    {

        'POST /news_publish': news_publish
    };