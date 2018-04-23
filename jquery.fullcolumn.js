/**
* jQuery.fullcolumn.js web页面Tab/Enter键通栏
* 
* https://github.com/guandy
*  
* Author guandy 2018 [ ggh123@gmail.com ] 
* 
*/
var index = 0;
var isie = (document.all) ? true : false;
var key;
var elems = [], areaEle;

$(document).keydown(function (e) {
    if (isie) {
        key = event.keyCode;
    } else {
        key = e.which;
    }

    if (isie && key == 13) {
        event.keyCode = 9;
    } else if (!isie && key == 13) {
        var ele = getNextEle();
        if (ele == null)
            return true;
       
        $(ele).focus();
        $(ele).select(); //文本全选
        if ($(ele)[0].type == "textarea") //文本全选状态，回车跳到下一个标签
        {
            areaEle = ele;
            $(areaEle).attr("noEdit", "all");
            $(areaEle).unbind("input propertychange").bind('input propertychange', function () {
                $(this).removeAttr("noEdit"); //文本设置为非全选状态
            });
            $(areaEle).unbind("keydown").bind("keydown", function() {
                if (event.keyCode != "13") {
                    $(this).removeAttr("noEdit"); //文本设置为非全选状态
                }
            });
            $(areaEle).unbind("focus").bind("focus", function() {
                $(this).removeAttr("noEdit"); //文本设置为非全选状态
                return true;
            });
        }
        return false;
    }
});


function getNextEle() {
    var allEle = $("input,select,textarea,a[tabindex]");
    var focusEle = $(":focus");
    if (focusEle[0].type == "textarea") {
        return null;
    }
    var getFocus = false; //是否已经找到焦点元素
    var getNext = false; //是否已经获取到下一元素
    var getFirst = false; //是否已经取到了第一个元素
    var firstEle; //第一个元素，如果无焦点元素返回第一个元素
    for (var i = 0; i < allEle.length; i++) {
        var ae = allEle.eq(i);
        if ($(ae[0]).is(':hidden'))
            continue;
        var aeType = $(ae).attr("type");
        if (!aeType) {
            aeType = ae[0].type;
        }
        if (!aeType && ae[0].tagName != "A") {
            continue;
        }
        if (ae[0].tagName != "A") {
            if (aeType != 'text' && aeType != 'textarea' && aeType != 'select' && aeType != 'radio' && aeType != "checkbox" && aeType != "password")
                continue;
        }
        if (!getFirst)
            firstEle = ae;
        getFirst = true;
        if (getFocus) //已找到焦点元素直接返回当前元素
            return ae;
        getFocus = focusEle.is(ae);
    }
    return firstEle;
}