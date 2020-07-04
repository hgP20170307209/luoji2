/* 监听页面的加载，等页面加载完再执行js代码 */
$(() => {

    $("#phoneID").val(13926291888);
    // $("#usernameID").val("zs");
    $("#passwordA").val(123);
    $("#passwordB").val(123);

    let imgCode;
    /*不传值，统一走默认值*/
    let captcha = new Captcha({
        lineWidth: 1, //线条宽度
        lineNum: 2, //线条数量
        // dotR: 200, //点的半径
        // dotNum: 1000, //点的数量
        preGroundColor: [10, 80], //前景色区间
        backGroundColor: [150, 250], //背景色区间
        fontSize: 40, //字体大小
        fontFamily: ['Georgia', '微软雅黑', 'Helvetica', 'Arial'], //字体类型
        fontStyle: 'stroke', //字体绘制方法，有fill和stroke
        content: '0123456789', //验证码内容
        length: 4 //验证码长度
    });

    captcha.draw(document.querySelector('#captcha'), r => {
        console.log('验证码', r);
        imgCode = r;

        /* 自动触发标签的事件 */
        $("#imageCode").trigger("blur");
    });

    // (1) 正则校验
    // (2) 事件处理(表单)
    // (3) 图形验证码
    /* 思路：给输入框添加事件(失去焦点)监听，当失去焦点的时候，应该获取输入框的内容进行正则校验 */
    let options = {
        // "usernameID": {
        //     reg: `/^[a-zA-Z]{2,6}$/.test(val)`,
        //     msg: "用户名不符合规范!!!"
        // },
        "phoneID": {
            reg: `/^1[3-9]\\d{9}$/.test(val)`,
            msg: "手机号码不符合规范!!!"
        },
        "passwordA": {
            reg: `/^[a-zA-Z0-9]{3,6}$/.test(val)`,
            msg: "密码不符合规范!!!"
        },
        "passwordB": {
            reg: `$.trim($("#passwordA").val()) === val`,
            msg: "两次输入的密码不相同!!!"
        },
        "imageCode": {
            reg: "val == imgCode",
            msg: "图形验证码不正确！！！"
        }
    }
    $(".from-group-ul input").blur(function() {
        let option_id = this.id;
        // console.log("option_id", options[option_id]);

        let val = $.trim($(this).val());

        if (eval(options[option_id].reg)) {
            $(this).next().text("");
            // $(this).parents(".form-item").removeClass("form-group-error");
        } else {
            $(this).next().text(options[option_id].msg);
            // $(this).parents(".form-item").addClass("form-group-error");
        }
    })

    // (4) 注册功能(获取参数并且发送网络请求， 在服务器端进行处理)
    $("#registerBtn").click(function() {
        // console.log("!!!!!")
        /* [1] 检查表单验证是否全部都通过，如果有一个没有通过那么就return  */
        $("#phoneID,#passwordA,#passwordB,#imageCode").trigger("blur");

        if ($(".form-group-error").length != 0) {
            return;
        }

        /* [2] 检查是否勾选 */
        let isCheck = $("#protocol").is(":checked");
        if (!isCheck) {
            alert("请阅读并同意用户的注册协议!!!");
            return;
        }
        let data = {
            phone: $.trim($("#phoneID").val()),
            password: md5($.trim($("#passwordA").val())).slice(0, 15)
        }
        // console.log(data);
        

        /* [3] 发送网络请求去执行注册 */
        $.ajax({
            url: "./server/res.php",
            type: "post",
            data,
            dataType: "json",
        }).done(data => {
            if (data.status == "success") {
                alert("注册成功!");
                // location.href = "http://www.baidu.com";
            } else {
                alert(data.msg);
            }
        })
    });

    /* 用户A：密码12345   明文12345QQ */
    /* 用户B：密码loveIt  明文loveItQQ */

    /* 密码：12345QQ     明文：12345QQ */
    /* 密码：loveItQQ    明文：12345QQ */
    /* md5加密 */
    // console.log(md5("loveIt"), md5("loveIt").slice(0, 10));
});


