(function () {
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
                        src = "http://lorempixel.com/1600/900?_t=" + (new Date() * Math.random())
                        imgEl.src = src;
                        imgEl.className += " show";
                        imgEl.parentElement.cite = src;
                        // 数组splice操作会影响循环
                        arrTemp.splice(i, 1);
                    }
                }
                imgEls = arrTemp;
            }

            if (imgEls.length === 0) {
                window.removeEventListener("scroll", showImg);
            }
        }
    window.addEventListener("DOMContentLoaded", function () {
        imgEls = Array.prototype.slice.call(document.querySelectorAll(".post-img-container .post-img"),1);
        showImg();
    })
    window.addEventListener("load", showImg)
    window.addEventListener("scroll", showImg)
})();
