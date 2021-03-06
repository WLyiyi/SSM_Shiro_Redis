layui.use(['form', 'layer'], function () {
    var form = layui.form
        , layer = layui.layer;

    //监听提交
    $('#fshLogin').click(function () {
        var username = $.trim($("#username").val());//$.trim()删除开始和结尾的空格
        var password = $.trim($("#password").val());
        if(username==""){
            layer.msg('请输入账号');
            return;
        }
        if(password==""){
            layer.msg('请输入密码');
            return;
        }
        ajax({
            url: '/user/login',
            type: 'POST',
            dataType: 'json',
            data: {
                account: username,
                pwd: password
            },
            success: function (result) {
                if (result.success) {
                    if ($('#remember').is(':checked')) {
                        localStorage.setItem('username', username);
                        localStorage.setItem('password', password);
                    } else {
                        localStorage.clear('username');
                        localStorage.clear('password');
                    }
                    localStorage.setItem('nickname', result.data?result.data:"管理员");
                    window.location.href = "/views/index.html";
                }else{
                    layer.msg(result.msg || "登录失败");
                }
            },
            error: function () {
                layer.msg("登录失败");
            }
        })
    })
});
