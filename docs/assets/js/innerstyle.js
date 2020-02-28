$(document).ready(function() {
    sidebarBackground();
    setPaginationFooter();


    $(window).resize(function() {
        // ไว้จัดการ pagination ในโหมด mobile ลบ class ออกเพราะมันไม่อยู่ตรงกลางเวลา responsive และมองไม่เห็นปุ่มที่เหลือด้วย
        setPaginationFooter();
    });


});

function sidebarBackground() {
    $findsidebar = document.getElementById('sidebar');
    $sidebar_bgcolor = $findsidebar.dataset.backgroundColor;
    $sidebar_sidecolor = $findsidebar.dataset.sideColor;
    $sidebar_color = $findsidebar.dataset.color;
    $navbar_bg = $findsidebar.dataset.imageNavbar;
    $sidebar_img = $findsidebar.dataset.sideImage;

    HTMLElement.prototype.pseudoStyle = function(element, value, content) {
        var _this = this;
        var _sheetId = "pseudoStyles";
        var _head = document.head || document.getElementsByTagName('head')[0];
        var _sheet = document.getElementById(_sheetId) || document.createElement('style');
        _sheet.id = _sheetId;
        var className = content;

        _this.className += " " + className;

        var setpropvalue = "";
        $.each(value, function(k, v) {
            setpropvalue += k + " : " + v + ";\n";
        });
        var propvalue = setpropvalue.substr(0, setpropvalue.length - 1);

        if (element != "") {
            _sheet.innerHTML += "\n." + className + ":" + element + "{" + propvalue + "}";
        } else {
            _sheet.innerHTML += "\n." + className + "{" + propvalue + "}";
        }

        /* add more style it can't normal edit */
        // select dropdown role & organize 
        _sheet.innerHTML += "\n.bootstrap-select .dropdown-item.active { color: " + $sidebar_bgcolor + "; background: " + $sidebar_color + "; }";
        _sheet.innerHTML += "\n.bootstrap-select .dropdown-menu li a:focus, .bootstrap-select .dropdown-menu li a:hover{ color: " + $sidebar_bgcolor + "; background: " + $sidebar_color + "; }";
        _sheet.innerHTML += "\n .moinavbar-link i { color: " + $sidebar_color + "!important; font-size: 2rem;}";

        _head.appendChild(_sheet);
        return this;
    };

    /*
    == develop this code by 'Andrew McGivery' ==
    http://mcgivery.com/htmlelement-pseudostyle-settingmodifying-before-and-after-in-javascript/
    */

    //#Set Style Navbar
    $findbackground = $('.sidebar-background');
    $findbackground.attr("id", "sidebar-background");
    $idbackground = document.getElementById('sidebar-background');

    // -- ภาพที่จะซ้อนบนพื้นหลัง --
    var navbar_custom = {
        "position": "absolute",
        "content": "''",
        "background": "url('" + $navbar_bg + "')",
        "background-repeat": "no-repeat",
        "background-position-x": "right",
        "background-size": "auto 100%",
        "width": "100%",
        "height": "93%",
        "top": "0",
        "left": "0"
    };
    $idbackground.pseudoStyle("after", navbar_custom, "navbar");

    //#Set Style Sidebar
    $idsidebar = $('.sidebar-wrapper');
    var sidebar_custom = {
        "background-image": "url('" + $sidebar_img + "')",
        "background-repeat": "no-repeat",
        "background-position": "center"
    }
    $idsidebar.css(sidebar_custom);

    //#Set important class of 'sidebar' by dynamic color
    $dataBgcolor = '[data-background-color="' + $sidebar_bgcolor + '"]';
    $dataColor = '[data-color="' + $sidebar_color + '"]';

    //-- Side Menu --
    // ตัวหนังสือ + icon
    $('.sidebar' + $dataBgcolor + ' .nav li .nav-link')
        .css({ "color": $sidebar_bgcolor });

    // ตัวหนังสือ + icon ชั้นที่ 2
    $('.sidebar' + $dataBgcolor + ' .nav li:hover:not(.active)>a, .sidebar' + $dataBgcolor + ' .nav li.active>[data-toggle="collapse"]')
        .css({
            "color": $sidebar_bgcolor,
            "background-color": $sidebar_color,
            "box-shadow": "none"
        });

    $('.sidebar' + $dataBgcolor + ' .nav li .dropdown-menu .dropdown-item')
        .css({ "color": $sidebar_bgcolor });

    $('.sidebar' + $dataBgcolor + ' .nav .nav-item .nav-link')
        .css({ "color": $sidebar_bgcolor });

    $('.sidebar' + $dataBgcolor + ' .simple-text')
        .css({ "color": $sidebar_bgcolor });

    $('.sidebar' + $dataBgcolor + ' .nav .nav-item.active .nav-link .sidebar-mini i')
        .css({ "color": $sidebar_bgcolor });

    $('.sidebar' + $dataColor + ' li.active>a')
        .css({
            "color": $sidebar_bgcolor,
            "background-color": $sidebar_color,
            "box-shadow": "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(255, 255, 255, 0.4)"
        });

    //select roles&organize
    $('.moibtn-select').css({
        "color": $sidebar_bgcolor,
        "background-color": $sidebar_color
    });

    // -- Side Menu สีพื้นหลัง --
    // $('.sidebar-wrapper').css({
    //     "background-color": $sidebar_sidecolor
    // });
}

function setPaginationFooter() {
    console.log($(window).width());

    if ($(window).width() < 992) {
        setTimeout(() => {
            $tablepagination = $('#inittable_paginate');
            $tableinfo = $('#inittable_info');
            $parentpagin = $tablepagination.parent();
            $parentinfo = $tableinfo.parent();
            $parentpagin.removeClass("col-sm-12 col-md-7");
            $parentinfo.removeClass("col-sm-12 col-md-5");
            $tablepagination.addClass("mt-3");
        }, 1000);
    } else {
        setTimeout(() => {
            $tablepagination = $('#inittable_paginate');
            $tableinfo = $('#inittable_info');
            $parentpagin = $tablepagination.parent();
            $parentinfo = $tableinfo.parent();
            $parentpagin.addClass("col-sm-12 col-md-7");
            $parentinfo.addClass("col-sm-12 col-md-5");
            $tablepagination.removeClass("mt-3");
        }, 1000);
    }

}