$(() => {
    let user_id = localStorage.getItem("user_id") || "";
    /* 发请求获取购物车的商品信息 */
    $.ajax({
        url:"./server/getCart.php",
        data: {user_id},
        dataType: "json"
    }).done(data => {
        // console.log(data);
        
        let html = data.map(function(item){
            return `
            <div class="table-x">
                    <div class="table-x-int">
                        <input class="table-checkbox2" type="checkbox">
                        <label for=""></label>
                    </div>
                    <div class="table-x-img"> 
                        <a href="">
                            <img src=${item.src} alt="">
                        </a>
                        <p>
                            ${item.title}
                        </p>   
                    </div>
                    <ul class="table-price-box">
                        <li class="a-price">
                            <i>￥${item.price}</i>
                        </li>
                        <li class="price-btn">
                            <a id="cut" class="cut-btn btn" href="javascript:void(0)">-</a>
                            <input id="text"  class="num" type="text" value="${item.num}">
                            <a id="add" class="add-btn btn" href="javascript:void(0)">+</a>
                        </li>
                        <li class="price-total">
                        ￥<i class="price-col ">${item.num * item.price }</i>
                        </li>
                        <li class="price-delete">   
                            <a href="javascript:void(0)"  class="delete-btn">删除</a>
                        </li>
                    </ul>
                </div>
            `
        }).join("") 
        // console.log(html);
        $(".cont-list").html(html)
    })


    //全选功能
    $("#all").click(function() {
        console.log(this,$(this).is(":checked"))
        
        $(this).next().toggleClass("mark")
        $(".table-x").find("input[type=checkbox]").next().toggleClass("mark")
        computedTotal();
        
    })

    

    //计算商品的总数和总价
    function computedTotal(){
        let ele = $(".table-x").filter(function() {
            return $(".table-checkbox2", this).next().hasClass("mark") == true
        })

        //计算数量
        let total = 0
        let totalPrice = 0
        ele.each(function(index,item) {
            // console.log(index, item, $(item).find(".num").val(),
            // $(item).find(".price-col").text().slice(1))

            total += $(item).find(".sum").val() *1
            totalPrice += $(item).find(".price-col").text().slice(1) * 1
        })

        $(".total_text").text("￥" + totalPrice.toFixed(2))
    }



    
    //增加、减少按钮
    $(".cont-list").on("click",".btn",function(){
        if($(this)[0].className == "add-btn btn"){
            $(this).prev().val(parseInt($(this).prev().val()) +1)

            // console.log($(this).prev().val())
            // console.log(typeof($(this).parent().prev().children().text().slice(1)))

            $(this).parent().next().children().text(
                $(this).prev().val() * $(this).parent().prev().children().text().slice(1) * 1
            )


        }else{
            if($(this).next().val() == 0){

            }else{
                $(this).next().val(parseInt($(this).next().val()) -1)

                $(this).parent().next().children().text(
                    $(this).next().val() * $(this).parent().prev().children().text().slice(1) * 1
                )
            }

            
        }
        
    })


    // 删除
    $(".cont-list").on("click",".delete-btn",function(){
         $(this).parent().parent().parent().remove()
        
        // console.log("---")
    })

    //全部删除
    $(".empty-box").click(function(){
        console.log( $(this).parent().prev().children("cart-table-box").children(".cont-list").children())
       
        
    })
    


})

