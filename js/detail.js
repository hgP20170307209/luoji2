$(() => {
    //  // 加入购物车的点击事件
    //  $(".check-box").on("click",".buy-btn1",function() {
    //     // console.log("++")
    //     let user_id = localStorage.getItem("user_id") || "";
    //     let phone = localStorage.getItem("user_phone") || "";
    //     let good_id = $(this).parent().parent().attr("data-id")

    //     // console.log(user_id, phone);
    //     if(user_id && phone){
            
    //         $.ajax({
    //             url: "./server/addCart.php",
    //             data: {user_id,good_id}
    //         }).done(data => {
    //             console.log("返回值：" ,data)
    //         })
    //     }else {
    //         location.href = "./login.html"
    //     }
    // })
    
    let good_id = GetQueryString("id");

    $.ajax({
        url:"./server/detail.php",
        data:{id:good_id},
        dataType:"json",
    })
})

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}