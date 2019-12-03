var toArray = function (arrayLike) {
    if (Array.isArray(arrayLike)) {
        return arrayLike;
    }
    return Array.prototype.slice.call(arrayLike);
};

var scrollIntoView = function (el) {
    if (!(el instanceof Element)) {
        return;
    }
    el.scrollIntoViewIfNeeded ? el.scrollIntoViewIfNeeded() : el.scrollIntoView();
}

var $_ = function (selector) {
    return document.querySelector(selector);
}

var $$_ = function (selector) {
    return toArray(document.querySelectorAll(selector));
}

var qs = {
    parse: function (str) {
        var arr = str.split('&'),
            arrTemp = [],
            length = arr.length,
            i = 0,
            obj = {};
        for (; i < length; ++i) {
            arrTemp = arr[i].match(/^([\s\S]*?)=([\s\S]*)$/);
            obj[decodeURIComponent(arrTemp[1])] = decodeURIComponent(arrTemp[2])
        }
        return obj;
    }
}

var strToReg = function (str) {
    var strReg = /^\/([\s\S]*)\/([\s\S]*)/,
        arr,
        reg, 
        flag;
    if (!strReg.test(str)) {
        return;
    }
    arr = str.match(/^\/([\s\S]*)\/([\s\S]*)/);
    reg = arr[1],
    flag = arr[2];
    return new RegExp(reg,flag);
}

var createWorker =function(str) {
    return src  = URL.createObjectURL(new Blob([str]));
}