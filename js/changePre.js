var toArray = function(arrayLike) {
    return Array.prototype.slice.call(arrayLike);
}
var langObj = {
    js: 'JavaScript',
    html: 'HTML'
}
var createToolBar = function(codeClass) {
    var container  =document.createElement("div"),
        toolbar = container.cloneNode(),
        title = document.createElement("header"),
        lang;
    container.className = "code-pretty-container";
    toolbar.className = "code-pretty-toolbar";
    title.className = "code-pretty-toolbar__title";
    if(codeClass) {
       lang = codeClass.split("-").pop();
       if(langObj[lang]) {
           lang = langObj[lang];
       }
    }
    title.textContent = lang;
    toolbar.appendChild(title);
    container.appendChild(toolbar);
    return container;
}
window.onload = function() {
var preEls = toArray(document.querySelectorAll("pre")),
    codeEls = toArray(document.querySelectorAll("pre code")),
    codeItem = null,
    preItem = null,
    i= 0,
    preElsLength = preEls.length,
    codeElsLength = codeEls.length,
    preElsCopy = [],
    conatiner = null,
    codeClass;
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
    preItem.textContent = codeItem.textContent;
    container = createToolBar(codeClass);
    preItem.parentNode.replaceChild(container,preItem);
    container.appendChild(preItem);
}
prettyPrint();
}