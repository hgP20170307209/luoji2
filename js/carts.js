$(() => {
    let user_id = localStorage.getItem("user_id") || "";
    /* 发请求获取购物车的商品信息 */
    $.ajax({
        url:"./server/getCart.php",
        data: {user_id},
        dataType: "json"
    }).done(data => {
        console.log(data);
        
        let html = data.map(function(item){
            return `
            <div class="table-x">
                    <div class="table-x-int">
                        <input class="table-checkbox2" type="checkbox">
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
                            <i>${item.price}</i>
                        </li>
                        <li class="price-btn">
                            <a class="cut-btn" href="">-</a>
                            <input class="" type="text" value="${item.num}">
                            <a class="add-btn" href="">+</a>
                        </li>
                        <li class="price-total">
                            <i>￥${item.num * item.price}</i>
                        </li>
                        <li class="price-delete">
                            <a class="delete-btn">删除</a>
                        </li>
                    </ul>
                </div>

               
            `
        }).join("") 
        console.log(html);
        $(".cont-list").html(html)
    })


})