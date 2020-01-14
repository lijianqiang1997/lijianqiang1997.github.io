// anchorLink.js
var anchorList = document.createElement("ul");
anchorList.className = "anchorList";
var toArray = function(arrayLike) {
	return Array.prototype.slice.call(arrayLike);
};
var createAnChorList = function(el) {
	if (!(el instanceof Element)) {
		return;
	}
	var li = document.createElement("li");
	var a = document.createElement("a");
	li.className = "anchorList-item";
	a.textContent = el.textContent;
	a.href = "#" + el.id;
	li.appendChild(a);
	anchorList.appendChild(li);
}
var compareHgroupEl = function(el1, el2) {
	var tag1, tag2;
	if (el1 == null || el2 == null) {
		return -1;
	}
	tag1 = el1.tagName;
	tag2 = el2.tagName;
	return tag2.split('H')[1] - tag1.split('H')[1]
}

var hgroups = toArray(document.querySelectorAll('.post h2,.post h3,.post h4,.post h5,.post h6'));
hgroups.forEach(function(item, index) {
	item.id = index;
})

function toAnchorList() {
	var tempArr = [];
	var prevEl = null;
    var el = null;
    var resultArr = [];
	while (el = hgroups.shift()) {
		if (!tempArr.length) {
			prevEl= el;
			tempArr.push(el);
		} else if (compareHgroupEl(el, prevEl) > 0) {
			tempArr.pop();
			do {
				resultArr.push(prevEl);
			}while(compareHgroupEl(el, prevEl = tempArr.pop()) > 0)
			if(compareHgroupEl(el, prevEl) === 0) {
				resultArr.push(prevEl);
			}else {
				tempArr.push(prevEl);
			}
			prevEl = el;
			tempArr.push(el);
		} else {
			prevEl = el;
			tempArr.push(el);
		}
    }
	while (el = tempArr.pop()) {
		resultArr.push(el);
    }
    resultArr.reverse().forEach(function(item) {
        createAnChorList(item)
    })
}
toAnchorList();
document.body.appendChild(anchorList)
