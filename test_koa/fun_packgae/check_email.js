/*
检查邮箱格式函数
 */

function checkEmail(email)
{

    var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;

    if (myReg.test(email))
    {
        return true;
    } else
        return false;
}
module.exports =checkEmail;
