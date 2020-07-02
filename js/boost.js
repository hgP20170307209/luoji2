class Magnifier{
    constructor(){
        // 选择元素
        this.Sbox = document.querySelector(".big-img");
        this.Simg = document.querySelector(".big-img img");
        this.span = document.querySelector(".big-img span");
        this.Bbox = document.querySelector(".bigger-img");
        this.Bimg = document.querySelector(".bigger-img img");

        this.abtn = document.querySelectorAll(".small-img-list li");

        // 绑定事件
        this.addEvent();
    }
    addEvent(){
        var that = this;
        this.Sbox.onmouseover = function(){
            that.over();
        }
        this.Sbox.onmouseout = function(){
            that.out();
        }
        this.Sbox.onmousemove = function(eve){
            var e = eve || window.event;
            that.move(e);
        }
        // 给所有的li添加点击事件
        for(var i=0;i<this.abtn.length;i++){
            this.abtn[i].onclick = function(){
                // 点击时，准备修改图片地址，记得将当前点击的元素传入
                that.changeImg(this);
            }
        }
    }
    changeImg(ele){
        // 根据当前点击的元素的子元素(img)的src，切换图片
        this.Simg.src = this.Bimg.src = ele.children[0].src;
    }
    over(){
        this.span.style.display = "block";
        this.Bbox.style.display = "block";

        // span宽高比例：根据右侧大图和显示区域计算得来
        var spanW = this.Bimg.offsetWidth / this.Bbox.offsetWidth;
        var spanH = this.Bimg.offsetHeight / this.Bbox.offsetHeight;
        // console.log(spanW,spanH)
        // 根据宽高比例，设置span的真正宽高
        this.span.style.width = this.Sbox.offsetWidth / spanW + "px";
        this.span.style.height = this.Sbox.offsetHeight / spanH + "px";
    }
    out(){
        this.span.style.display = "none";
        this.Bbox.style.display = "none";
    }
    move(e){
        // 鼠标相对于页面的坐标 - sBox左边的位置 - span宽度的一半
        var l = e.pageX - this.Sbox.offsetLeft - this.span.offsetWidth/2;
        var t = e.pageY - this.Sbox.offsetTop - this.span.offsetHeight/2;

        // 边界限定
        if(l<0) l=0;    // left
        if(t<0) t=0;    // top
        // right
        if(l > this.Sbox.offsetWidth - this.span.offsetWidth){
            l = this.Sbox.offsetWidth - this.span.offsetWidth
        }
        // bottom
        if(t > this.Sbox.offsetHeight - this.span.offsetHeight){
            t = this.Sbox.offsetHeight - this.span.offsetHeight
        }

        // 设置span的位置
        this.span.style.left = l + "px";
        this.span.style.top = t + "px";

        // 计算span在sBox中的移动比例
        var x = l / (this.Sbox.offsetWidth - this.span.offsetWidth);
        var y = t / (this.Sbox.offsetHeight - this.span.offsetHeight);
        // console.log(x, y);

        // 根据比例设置右侧大图的移动位置
        this.Bimg.style.left = x * (this.Bbox.offsetWidth - this.Bimg.offsetWidth) + "px";
        this.Bimg.style.top =  y * (this.Bbox.offsetHeight - this.Bimg.offsetHeight) + "px";
    }
}