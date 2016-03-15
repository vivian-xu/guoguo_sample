$(document).ready(function(){
    var section = $("[data-id]");
    var pages = $("[data-page]");

/*
    $('#footer-nav-save .nav-link').on('click', function(event) {
    event.preventDefault();
    console.log("i go home!!"+"current_page:"+$(".now").length+", next_page:"+$("#add_shop").length);
    Out($('.now'), $('#add_shop'));
    });
*/

    section.each( function( index, el ) {
        var self = $(this);
// 店铺主营特殊处理
        if( self.attr("data-id") === "shop_main") {
            console.log("it's shop_main!" + self.html());
            self.on('click', function(event) {
                event.preventDefault();
                console.log("in here");
                actionSheet_main();
                addClassBtn();
                addClassinputAction();
            });
        }
        // 其他页面正常
        else {
            self.on('click', self, function(event) {
                event.preventDefault();
                var id = self.attr('data-id');
                var pageId = "[data-page='" + id + "']";
                var page = $(pageId);
                console.log("i'm home !!!"+ "next_page:"+page.length);
                Out($("#add_shop"), page);
            });
        }
    });
});

// 交换页面  -- 页面先缩小  再放大
// 初步认为是因为副页上的div 的高度控制

function Out( current_page, next_page) {
    current_page.addClass('slideOut').on('animationstart', function(event) {
        event.preventDefault();
        next_page.addClass('slideIn').show();
    }).on('animationend', function(event) {
            event.preventDefault();
            $(this).removeClass('slideOut').removeClass('now').hide();
            changeNav();
            next_page.addClass('now').removeClass('slideIn');
        });
}

// 进入副页面nav
function changeNav() {
    var homeNav = $("#footer-nav");
    var changeNav = $( '#footer-nav-save' );
    var isHomeHide = $("#add_shop").is( ' :hidden ' );
    var isHomeNavHide = homeNav.is(' :hidden ');
    if ( isHomeHide && !isHomeNavHide ) {
        homeNav.hide();
        changeNav.show();
    }
    else if(!isHomeHide && isHomeNavHide) {
        changeNav.hide();
        homeNav.show();
    }
}

// 类目选择的滑出框
function actionSheet_main() {
      var mask = $('#mask');
      var weuiActionsheet = $('#weui_actionsheet');
      weuiActionsheet.addClass('weui_actionsheet_toggle');
      mask.show().addClass('weui_fade_toggle').one('click', function () {
          hideActionSheet(weuiActionsheet, mask);
      });
      $('#actionsheet_cancel').one('click', function () {
          hideActionSheet(weuiActionsheet, mask);
      });
      weuiActionsheet.unbind('transitionend').unbind('webkitTransitionEnd');

      function hideActionSheet(weuiActionsheet, mask) {
          weuiActionsheet.removeClass('weui_actionsheet_toggle');
          mask.removeClass('weui_fade_toggle');
          weuiActionsheet.on('transitionend', function () {
              mask.hide();
          }).on('webkitTransitionEnd', function () {
              mask.hide();
          });
      }
}

// 新建类目的 btn
function addClassBtn() {
    var _btn = $("#actionSheet_wrap .add_class_btn");
    _btn.on('click', function(event) {
        event.preventDefault();
        Out($("#add_shop"), $("#select_shopMain"));
    });
}
// 新建类目副页的btn
function addClassinputAction() {
  var _input_btn = $("#input_btn");
  var _input_box = $("#add_input");

  _input_btn.on('click', function(event) {
    event.preventDefault();
    console.log("input");
    if( _input_box.is(":hidden")) {
      _input_box.show();
    }
  });
}
