(function () {
    var imgEls = [],
        showImg = function () {
            var i = 0,
                length = imgEls.length,
                imgEl,
                elInfo,
                arrTemp = imgEls;
            if (imgEls.length > 0) {
                for (; i < length; ++i) {
                    imgEl = imgEls[i];
                    if (imgEl) {
                        elInfo = imgEl.getBoundingClientRect();
                        if (elInfo.top <= window.innerHeight) {
                            imgEl.src = "http://lorempixel.com/1600/900?_t=" + (new Date() * Math.random())
                            // 数组splice操作会影响循环
                            arrTemp.splice(i, 1);
                        }
                    }

                }
                imgEls = arrTemp;
            }

            if (imgEls.length === 0) {
                window.removeEventListener("scroll", showImg);
            }
        }
    window.addEventListener("DOMContentLoaded", function () {
        imgEls = Array.prototype.slice.call(document.querySelectorAll(".post-img"));
    })
    window.addEventListener("load", showImg)
    window.addEventListener("scroll", showImg)
})();
