var $window = $(window);
var iphone = $('#iphone');
var nav = $('#top');
var col1 = $('#col1');
var container2 = $("#container2");
var col2 = $('#col2');
var col3 = $('#col3');
var col4 = $('#col4');
var city1 = $('#city1');
var city2 = $('#city2');
var city3 = $('#city3');
var city4 = $('#city4');
var sign1 = $("#sign1");
var sign2 = $('#sign2');
var sign3 = $('#sign3');
var rev1 = $("#rev1");
var rev2 = $("#rev2");
var rev3 = $("#rev3");
var s1 = false;
var s2 = false;
var s3 = false;


function isScrolledIntoView(elem, $window) {
    var docViewTop = $window.scrollTop();
    // console.log(docViewTop);
    var docViewBottom = docViewTop + $window.height();

    var elemTop = elem.offset().top;
    var elemBottom = elemTop + elem.height();

    return ((elemTop >= docViewTop) && (elemBottom <= docViewBottom));
}
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
$(document).on("scroll", function () {
    var propertyObject = {
        'fontsize': '500px', 'left': '200px'
    }
    if(container2){
        if ($window.scrollTop() >= container2.offset().top) {
            var ul = $("#top");
            var logo = $(".logo");

            var collapse = $(".normal");
            var link = $('#link');
            var img = $('.logo-md');
            if (collapse) {
                img.addClass('coll-img');
                img.removeClass('logo-md')
                ul.addClass("b");
                link.addClass("a");
                logo.addClass("c");
                collapse.addClass("colla");
            }

        }
        else {

            var img = $('.coll-img');
            img.addClass('logo-md');
            img.removeClass('coll-img')
            var ul = $("#top");
            ul.removeClass("b");
            var link = $('#link');
            link.removeClass("a");
            var logo = $(".logo");
            logo.removeClass("c");

            var collapse = $(".normal");
            collapse.removeClass("colla");

        }
    }
    

    if (isScrolledIntoView(iphone, $window)) {
        iphone.addClass("animated fadeInUp")
    }
    if (isScrolledIntoView(col1, $window)) {
        col1.addClass("animated fadeIn")
    }
    if (isScrolledIntoView(col2, $window)) {
        col2.addClass("animated fadeIn")
    }
    if (isScrolledIntoView(col3, $window)) {
        col3.addClass("animated fadeIn")
    }
    if (isScrolledIntoView(col4, $window)) {
        col4.addClass("animated fadeIn")
    }
    if (isScrolledIntoView(city1, $window)) {
        city1.addClass("animated fadeIn")
    }
    if (isScrolledIntoView(city2, $window)) {
        city2.addClass("animated fadeIn")
    }
    if (isScrolledIntoView(city3, $window)) {
        city3.addClass("animated fadeIn")
    }
    if (isScrolledIntoView(city4, $window)) {
        city4.addClass("animated fadeIn")
    }
    if (isScrolledIntoView(sign1, $window)) {
        s1 = true;
        sign1.addClass("animated pulse")
    }
    console.log(s1);
    if (s1) {
        // console.log(s1);
        if (isScrolledIntoView(sign2, $window)) {
            s2 = true;
            sign2.addClass("animated pulse")
            // sign3.addClass("animated pulse")
        }
    }
    // console.log(s2)

    if (s2) {
        // console.log(s2)
        if (isScrolledIntoView(sign3, $window)) {
            sign3.addClass("animated pulse")
        }
    }


    if (isScrolledIntoView(rev1, $window)) {
        rev1.addClass("animated fadeInUp")
    }
    if (isScrolledIntoView(rev2, $window)) {
        rev2.addClass("animated fadeInDown")
    }
    if (isScrolledIntoView(rev3, $window)) {
        rev3.addClass("animated fadeInUp")
    }

});