var str = "(-(t|r|b|l|tb|rl|bt|lr)-\\d+){1,4}",
    marRegStr = "\\bmar(-\\d+|" + str + ")\\b",
    padRegStr = "\\bpad(-\\d+|" + str + ")\\b",
    widthReg = /((?<=^)|(?<=\s))(w|width)-\d+(?:\.\d+)?((?=$)|(?=\s))/ig,
    heightReg = /((?<=^)|(?<=\s))(h|height)-\d+(?:\.\d+)?((?=$)|(?=\s))/ig,
    marReg = new RegExp(marRegStr, "ig"),
    padReg = new RegExp(padRegStr, "ig"),
    fontReg = /((?<=^)|(?<=\s))(font-size|fz|font)-\d+((?=$)|(?=\s))/ig,
    lineHeightReg = /((?<=^)|(?<=\s))(line-height|lh)-\d+((?=$)|(?=\s))/ig,
    colorReg = /((?<=^)|(?<=\s))color-([0-9a-fA-F]{6}|[0-9a-fA-F]{3})((?=$)|(?=\s))/ig,
    directionReg = /((?<=^)|(?<=\s))(top|right|bottom|left|t|r|b|l)--?\d+((?=$)|(?=\s))/ig;

var commonSolveFn = function (item, transformNum) {
    item = item.trim();
    var attrObj = {
        w: 'width',
        h: 'height',
        lh: 'line-height',
        fz: 'font-size',
        font: 'font-size',
        c: 'color'
    },
        resultArr = item.match(/([\s\S]*)-(\d+(?:\.\d+)?)/),
        attr = resultArr[1].toLocaleLowerCase(),
        num = resultArr[2],
        StratSegy = function (attr, transformNum) {
            this.attr = attr;
            this.transformNum = transformNum;
        };
        StratSegy.prototype.findStrategy = function (num) {
        var map = new Map([[
            'color',
            function () {
                return '#' + num
            }
        ]]),
            attr = this.attr,
            transformNum = this.transformNum;

        if (map.has(attr)) {
            num = map.get(attr)();
        } else if (typeof transformNum === 'function') {
            num = transformNum(num);
        }
        return num
    }
  
    if (attr in attrObj) {
        attr = attrObj[attr]
    }

    var sObj = new StratSegy(attr, transformNum);
    num = sObj.findStrategy(num);
    return attr + ": " + num;
},
    marginSolveFn = function (item, transformNum) {
        var str = "-(t|r|b|l|tb|rl)-\\d+",
            number,
            nArr = [],
            s = "",
            reg = new RegExp(str, "ig"),
            item = item.trim();
        if (/^mar-\d+$/.test(item)) {
            number = item.split(/mar-/i)[1];
            return "margin: " + transformNum(number);
        } else {
            s = "";
            nArr = item.split(/mar-/i)[1];
            var a = nArr.split("-"),
                position,
                num,
                i = 0,
                length = a.length;
            for (; i < length; i += 2) {
                position = a[i].toLocaleLowerCase();
                num = a[i + 1];
                if (position === "t") {
                    return "margin-top:" + transformNum(num);
                } else if (position === "r") {
                    return "margin-right:" + transformNum(num);
                } else if (position === "b") {
                    return "margin-bottom:" + transformNum(num);
                } else if (position === "l") {
                    return "margin-left:" + transformNum(num);
                } else if (position === "lr" || position === "rl") {
                    return "margin-left:" + transformNum(num) + ";margin-right:" + transformNum(num);;
                } else if (position === "tb" || position === "bt") {
                    return "margin-top:" + transformNum(num) + ";margin-bottom:" + transformNum(num);
                }
            }
        }
    },
    paddingSolveFn = function (item, transformNum) {
        var str = "-(t|r|b|l|tb|rl)-\\d+",
            number,
            nArr = [],
            s = "",
            reg = new RegExp(str, "ig"),
            item = item.trim();
        if (/^pad-\d+$/.test(item)) {
            number = item.split(/pad-/i)[1];
            return "padding: " + transformNum(number);
        } else {
            s = "";
            nArr = item.split("pad-")[1];
            var a = nArr.split("-"),
                position,
                num,
                i = 0,
                length = a.length;
            for (; i < length; i += 2) {
                position = a[i].toLocaleLowerCase();
                num = a[i + 1];
                if (position === "t") {
                    return "padding-top:" + transformNum(num);
                } else if (position === "r") {
                    return "padding-right:" + transformNum(num);
                } else if (position === "b") {
                    return "padding-bottom:" + transformNum(num);
                } else if (position === "l") {
                    return "padding-left:" + transformNum(num);
                } else if (position === "lr" || position === "rl") {
                    return "padding-left:" + transformNum(num) + ";padding-right:" + transformNum(num);
                } else if (position === "tb" || position === "bt") {
                    return "padding-top:" + transformNum(num) + ";padding-bottom:" + transformNum(num);
                }
            }
        }
    };

var newAutoClass = function (base) {
    var defaultConfig = {
        width: {
            reg: widthReg,
            solveFn: commonSolveFn
        },
        height: {
            reg: heightReg,
            solveFn: commonSolveFn
        },
        padding: {
            reg: padReg,
            solveFn: paddingSolveFn
        },
        margin: {
            reg: marReg,
            solveFn: marginSolveFn
        },
        "font-size": {
            reg: fontReg,
            solveFn: commonSolveFn
        },
        "line-height": {
            reg: lineHeightReg,
            solveFn: commonSolveFn
        },
        color: {
            reg: colorReg,
            solveFn: commonSolveFn
        }
    }
    this.regArr = [];
    this.solevFnArr = [];
    this.resultArr = [];
    if (base) {
        if (Array.isArray(base)) {
            base = base.map(item => defaultConfig[item]).filter(item => item !== undefined);
            this.addRules(...base)
        } else {
            if (base in defaultConfig) {
                base = defaultConfig[item]
                this.addRules(base)
            }
        }
    }
}
newAutoClass.prototype.addRules = function ({ reg, solveFn }) {
    var length = arguments.length,
        obj,
        reg,
        solveFn,
        objArr = Array.prototype.slice.call(arguments),
        _this = this;
    Array.prototype.slice.call(arguments).forEach(function (item, index, array) {
        obj = item;
        reg = obj.reg;
        solveFn = obj.solveFn;
        _this.regArr.push(reg ? reg : null);
        _this.solevFnArr.push(typeof solveFn === 'function' ? solveFn : null);
    })
    return this;
}
newAutoClass.prototype.run = function ({
    unit = 'px',
    base = 1,
    log = true
} = {}) {
    var elements = document.body.getElementsByTagName("*"),
        elementArray = Array.prototype.slice.call(elements),
        style = "",
        totalArr = [],
        _this = this;
    var transformNum = function (num) {
        return num / base + unit;
    }
    elementArray.forEach(function (item, index, array) {
        var className = item.className;

        _this.regArr.forEach(function (reg, index) {
            if (reg === null) {
                return;
            }
            if (!totalArr[index]) {
                totalArr[index] = [];
            }
            var arr = className.match(reg);
            if (arr) {
                totalArr[index] = totalArr[index].concat(arr);
            }
        })
    });

    // 不同分类css属性集合
    totalArr.forEach(function (arr, index, array) {
        var solveFn = _this.solevFnArr[index];
        if (typeof solveFn !== 'function') {
            return;
        }

        arr = [...new Set(arr)];
        arr.forEach(function (item) {
            style += "." + item.trim() + " {" + solveFn(item, transformNum) + ";}\n";
        });
    });
    if (log) {
        console.log(style)
    }
}

export default  new newAutoClass(["width","height","margin","line-height","color","font-size"]);