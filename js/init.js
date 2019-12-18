// (function () {
//     var createImg = (function(){
//         //在页面上创建img元素
//         var img = null;
//         return {
//             setImg:function(src,imgEl){ 
//                 if(!imgEl) {
//                     imgEl = img?img.cloneNode():document.createElement("img");
//                 }
//                 imgEl.src = src;
//                 imgEl.className += "show";
//                 imgEl.parentElement && (imgEl.parentElement.cite = src);
//             }
//         }
//     })() 

//     var proxyImg = (function(){
//         //img对象  提前加载一张图片如果给这个图片加了一个src属性后就相当于在浏览器中缓存了一张图片

//         return {
//             setSrc:function(src,imgEl){
//                 var image = new Image();
//                 image.src = src;
//                 image.el = imgEl;
//                 image.onload = function(){
//                     createImg.setImg(this.src,this.el );
//                 }
//             }
//         }
//     })()
//     var imgEls = [],
//         showImg = function () {
//             var i = 0,
//                 length = imgEls.length,
//                 imgEl,
//                 elInfo,
//                 arrTemp = imgEls.slice(0),
//                 src ="";
//             if (imgEls.length > 0) {
//                 for (; i < length; ++i) {
//                     imgEl = imgEls[i];
//                     elInfo = imgEl.getBoundingClientRect();
//                     if (elInfo.top <= window.innerHeight) {
//                         src = "http://lorempixel.com/1600/900?_t=" + (new Date() * Math.random()*10);
//                         proxyImg.setSrc(src,imgEl);
//                         // 数组splice操作会影响循环
//                         arrTemp.splice(i, 1);
//                     }
//                 }
//                 imgEls = arrTemp;
//             }

//             if (imgEls.length === 0) {
//                 window.removeEventListener("scroll", showImg);
//                 window.removeEventListener("resize", showImg);
//             }
//         }
//     window.addEventListener("DOMContentLoaded", function () {
//         imgEls = Array.prototype.slice.call(document.querySelectorAll(".post-img-container .post-img"),1);
//         showImg();
//     })
//     window.addEventListener("load", showImg)
//     window.addEventListener("scroll", showImg)
//     window.addEventListener("resize", showImg)
// })();


(function () {

    var Canvas = function (canvas) {
        this.$el = canvas;
        if (canvas.getContext) {
            this.context = canvas.getContext("2d");
        }
        canvas.removeAttribute("width");
        canvas.removeAttribute("height");
        this.width = canvas.clientWidth;
        this.height = canvas.clientHeight;
        this.fontSize = 40;
        this.text = canvas.dataset.text;
        this.id = null;
    };
    Canvas.prototype.start = function () {
        var canvas = this.$el,
            context = this.context,
            width = this.width,
            height = this.height;

        canvas.width = width;
        canvas.height = height;
        context.font = this.fontSize + "px serif";
        context.textAlign = "center";
        this.createText();
    };

    Canvas.prototype.createText = function () {
        var text = this.text,
            textArr = text.split(""),
            context = this.context,
            textLength = context.measureText(text).width,
            fontSize = this.fontSize,
            width = this.width,
            height = this.height,
            middle = Math.round(height / 2),
            start = Math.round(width / 2),
            i = 0,
            length = textArr.length,
            _this = this,
            animateFn = null;
        this.id = setTimeout(animateFn = function () {
            context.clearRect(0, 0, width, height);
            context.fillText(textArr.slice(0, i + 1).join(""), start, middle);
            i = (i + 1) % length;
            _this.id = setTimeout(animateFn, 400)
        }, 400)
    }

    Canvas.prototype.stop = function () {
        clearTimeout(this.id);
    }

    var cache = {
        obj: [],
        getCanvas: function (el) {
            var obj = this.obj,
                i = 0,
                length = obj.length,
                res = null;
            for (; i < length; ++i) {
                if (obj[i].el === el) {
                    res = obj[i].canvas;
                    res.stop();
                    return res;
                }
            }
            res = new Canvas(el);
            this.obj.push({
                el: el,
                canvas: res
            });
            return res;
        }
    };

    var canvasShow = function () {
        var canvasArr = Array.prototype.slice.call(document.querySelectorAll(".post-canvas"));
        canvasArr.forEach(function (item, index, array) {
            var canvas = cache.getCanvas(item),
            elInfo = item.getBoundingClientRect();
            if(elInfo.top <= window.innerHeight) {
                canvas.start();
            }
        })
    }
    window.addEventListener("load", canvasShow);
    window.addEventListener("resize", canvasShow);
    window.addEventListener("scroll", canvasShow)
}());