/*
一般情况下不调用。耗时
向所有学生发送重要邮件通知（如 开始选课通知）
遍历每一个可以接收通知的邮箱，发送通知

 */
const models =require('../DB_model/model.js');
var checkEmail=require('../fun_packgae/check_email.js');
var sendEmail=require('../fun_packgae/sendEmail.js');
/*
email_list: 接收方列表
title:  重要通知标题
content:重要通知内容

 */

var sendMailtoALL =function(email_list,title, content)
{



    for(var i=0;i<email_list.length;i++)
    {

        if(checkEmail(email_list[i].email))  //检查邮箱格式
        {
            console.log(email_list[i].email);
            if(sendEmail(email_list[i].email,title,content))
            {
                console.log(`邮件通知成功 ${email_list[i].Sname}...`);
            }
        }

    }

    console.log("邮件通知完毕");



}

module.exports = sendMailtoALL;