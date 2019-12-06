(function () {
    var createImg = (function(){
        //在页面上创建img元素
        var img = null;
        return {
            setImg:function(src,imgEl){ 
                if(!imgEl) {
                    imgEl = img?img.cloneNode():document.createElement("img");
                }
                imgEl.src = src;
                imgEl.className += "show";
                imgEl.parentElement && (imgEl.parentElement.cite = src);
            }
        }
    })() 

    var proxyImg = (function(){
        //img对象  提前加载一张图片如果给这个图片加了一个src属性后就相当于在浏览器中缓存了一张图片
        
        return {
            setSrc:function(src,imgEl){
                var image = new Image();
                image.src = src;
                image.el = imgEl;
                image.onload = function(){
                    createImg.setImg(this.src,this.el );
                }
            }
        }
    })()
    var imgEls = [],
        showImg = function () {
            var i = 0,
                length = imgEls.length,
                imgEl,
                elInfo,
                arrTemp = imgEls.slice(0),
                src ="";
            if (imgEls.length > 0) {
                for (; i < length; ++i) {
                    imgEl = imgEls[i];
                    elInfo = imgEl.getBoundingClientRect();
                    if (elInfo.top <= window.innerHeight) {
                        src = "http://lorempixel.com/1600/900?_t=" + (new Date() * Math.random()*10);
                        proxyImg.setSrc(src,imgEl);
                        // 数组splice操作会影响循环
                        arrTemp.splice(i, 1);
                    }
                }
                imgEls = arrTemp;
            }

            if (imgEls.length === 0) {
                window.removeEventListener("scroll", showImg);
                window.removeEventListener("resize", showImg);
            }
        }
    window.addEventListener("DOMContentLoaded", function () {
        imgEls = Array.prototype.slice.call(document.querySelectorAll(".post-img-container .post-img"),1);
        showImg();
    })
    window.addEventListener("load", showImg)
    window.addEventListener("scroll", showImg)
    window.addEventListener("resize", showImg)
})();
