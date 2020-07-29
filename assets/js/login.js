$(function () {
    $("#link_reg").on("click", function () {
        $(".login-box").hide();
        $(".reg-box").show();
    })
    $("#link_login").on("click", function () {
        $(".login-box").show();
        $(".reg-box").hide();
    })
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须为6到12位且不能有空格'],
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd != value) return '输入的密码不一致,请重新输入'
        }
    })
    $('#form_reg').on("submit", function (e) {
        e.preventDefault();
        //发起ajax请求
        var data = {
            username: $(".reg-box [name=username]").val(),
            password: $(".reg-box [name=password]").val(),

        }
        $.post("http://ajax.frontend.itheima.net/api/reguser", data, function (res) {
            if (res.status != 0) return layer.msg("res.message")
            layer.msg("注册成功")
            $("#link_login").click()
        })
    });
    $("#form_login").on("click", function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status != 0) {
                    layer.msg("登录失败")
                } else {
                    layer.msg("登录成功")
                    localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                    location.href = '/index.html'
                }
            }
        })
    })
})