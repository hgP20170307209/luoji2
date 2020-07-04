$(() => {
    //1.发送网络请求获取服务器端的数据
    getDataAndRenderUI("default");

    //获取总页码的数量
    getPageCount() 

    function getPageCount(){
        $.ajax({
            type: "get",
            url: "./server/getPageCount.php",
            success: function(response) {
                // console.log("页码", response);

                /* 创建页码 */
                /* 
                <li class="active active-2">
                                <a href="">1</a>
                </li>
                <li class="active">
                                <a href="">2</a>
                </li> */
                let pageStr = "";
                for (let i = 0; i < response; i++) {
                    pageStr += `<li class='active ${i == 0 ? "active-2":""}'><a href="javascript:void(0)">${i+1}</a></li>`;
                }
                $(pageStr).insertBefore("#nextPage");
            }
        });
    }


    function getDataAndRenderUI(sort, page = 0){
        $.ajax({
            url:"./server/getList.php",
            data: {
                sort,
                page: page
            },
            dataType:"json",
        }).done(data => {
            let html = data.map(item => {
                return `
                    <li class="page-list" data-id=${item.good_id}>
                    <p class="list-img">
                        <a href="detail.html?id=${item.good_id}" target="_blank">
                            <img src=${item.src} alt="罗技 G560 Lightsync PC游戏音箱">
                        </a>
                    </p>
                    <p class="list-name">
                        <a href="detail.html" title="罗技 G560 Lightsync PC游戏音箱">${item.title}</a>
                    </p>
                    <p class="list-price">
                        <span class="jiage">
                            
                                <strong>
                                    商城价
                                    <em>￥</em>${item.price}
                                </strong>
                        </span>
                        <span class="comment">${item.comment}</span>
                    </p>
                    <p class="list-tool clear_border">
                        <a class="tool-a" >加入购物车</a>
                    </p>
                </li>    
                `
            }).join("")
    
            $(".page-box").html(html)
        })
    }

  


    // 加入购物车的点击事件
    $(".page-box").on("click",".tool-a",function() {
        // console.log("++")
        let user_id = localStorage.getItem("user_id") || "";
        let phone = localStorage.getItem("user_phone") || "";
        let good_id = $(this).parent().parent().attr("data-id")


        // console.log(user_id, phone);

        if(user_id && phone){
            
            $.ajax({
                url: "./server/addCart.php",
                data: {user_id,good_id}
            }).done(data => {
                console.log("返回值：" ,data)
            })
        }else {

            location.href = "./login.html"
        }
    })

    /* 3、点击按钮的时候加入购物车 */
    // $("#cart").click(function() {
    //     location.href = "./cart.html"
    // })


    //4.排序功能
    $(".sort-left > a").click(function() {
        // let sortType = $(this).attr("data-sort");
        let sortType = $(this).data().sort;
        // console.log("sortType", sortType)
        getDataAndRenderUI(sortType);
      
    })

    // 5.分页功能
    $(".page-btn-box").on("click", ".active", function(e) {

        /* 设置选中状态的切换 */
        $(this).addClass("active-2").siblings().removeClass("active-2")
        let page = $(this).text() * 1 - 1
        console.log(page)
        getDataAndRenderUI($(".sort-a").data().sort,page)
    })

    /* 上一页和下一页的功能 */
    $("#prevPage,#nextPage").click(function() {

        //设置选中状态
        let page = $(".active-2").text() *1 -1
        if(this.id == "prevPage"){
            page--
        } else if(this.id == "nextPage") {
            page ++
        }

        $(".active").eq(page).addClass("active-2").siblings().removeClass("active-2")
        getDataAndRenderUI($(".cur").data().sort, page)
    })
})