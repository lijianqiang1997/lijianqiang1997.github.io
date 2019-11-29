var toArray = function(arrayLike) {
    return Array.prototype.slice.call(arrayLike);
}
var langObj = {
    js: 'JavaScript',
    html: 'HTML',
    vue: 'Vue'
}
var createToolBar = function(codeClass,filePath) {
    var container  =document.createElement("div"),
        toolbar = container.cloneNode(),
        fileEl = document.createElement("code"),
        title = document.createElement("header"),
        lang,
        fileStr,
        matches = [];
    container.className = "code-pretty-container";
    toolbar.className = "code-pretty-toolbar";
    fileEl.className = "code-pretty-toolbar__file";
    title.className = "code-pretty-toolbar__title";
    if(codeClass) {
       lang = codeClass.split("-").pop();
       if(langObj[lang]) {
           lang = langObj[lang];
       }
    }else {
        lang = "无"
    }
    fileStr = filePath || "未知";

    title.textContent = lang;
    fileEl.textContent = fileStr;
    if(filePath) {
        fileEl.textContent = filePath.trim();
    }
    toolbar.appendChild(title);
    toolbar.appendChild(fileEl);
    container.appendChild(toolbar);
    return container;
}
window.onload = function() {
var preEls = toArray(document.querySelectorAll("pre")),
    codeEls = toArray(document.querySelectorAll("pre code")),
    codeItem = null,
    preItem = null,
    codeContent = "",
    i= 0,
    preElsLength = preEls.length,
    codeElsLength = codeEls.length,
    preElsCopy = [],
    conatiner = null,
    codeClass,
    filePath;
for(;i<preElsLength;++i) {
    preItem = preEls[i];
    if(preItem.childElementCount) {
    if(toArray(preItem.children).some(item => item.tagName  === 'CODE'))
    preElsCopy.push(preItem);
    }
}
for (i=0;i<codeElsLength;++i) {
    preItem = preElsCopy[i];
    codeItem =codeEls[i];
    codeClass = codeItem.className;
    preItem.className = "prettyprint linenums "+codeClass;
    codeContent = codeItem.textContent;
    textArr = codeContent.split("\n");
    firstLineStr = textArr[0];
    matches = firstLineStr.match(/(?:\/\/)?((?:[^\/]+[\/\\])*[^\/]+\.[^\/,;]+)/) || [];
    preItem.textContent = Array.isArray(matches) && matches.length?textArr.slice(1).filter(function(item,index) {
        return item !== '' || index !== 0;
    }).join("\n"):codeContent;
    container = createToolBar(codeClass,matches[1]);
    preItem.parentNode.replaceChild(container,preItem);
    container.appendChild(preItem);
}
prettyPrint();
}