/*
系统发送邮件函数
通过加载smtp配置
设定接收方，主题，内容等
发送邮件

 */

var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('../fun_packgae/email_send_config.js');

//创建发送方
smtpTransport = nodemailer.createTransport(smtpTransport(
    {
    service: config.email.service,
    auth: {
        user: config.email.user,
        pass: config.email.pass
    }
}));


var sendMail = function (recieve, title, content)
{

    smtpTransport.sendMail({

        from: config.email.user,
        to: recieve,   //接收方
        subject: title,  //主题
        html: content  //内容

    }, function (error, response)
    {
        if (error)
        {
            console.log(error);
            return false;
        }
        console.log('发送成功');

    });
    return true;
}

module.exports = sendMail;