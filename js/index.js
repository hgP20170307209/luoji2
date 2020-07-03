$(() => {
    /* 登录状态的处理 */
    /* 检查本地是否保存user_id和user_name的值，如果本地有，那么表示当前是登录状态 */
    /* 如果没有，那么表示当前是未登录的状态 */

    let user_id = localStorage.getItem("user_id") || "";
    let phone = localStorage.getItem("user_phone") || "";
    // console.log(user_id,phone)
     if(user_id && phone) {
         $(".userInfo").text(`${phone}:欢迎您`)
         $(".status").text("注销")
        //  $(".zhuxiao").text("注销")
     }else {
        // $(".userInfo").text(``)
        $(".status").text("请登录")
     }

     $(".status").click(function() {
         if ($(this).text() == "请登录"){
             location.href = "./login.html"
         }else {
             localStorage.removeItem("user_id")
             localStorage.removeItem("user_phone")

             window.location.reload()
         }
     })

})