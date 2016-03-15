$(document).ready(function() {
    $(".item_downMenu").click( function(){
        $(".menu_item").fadeToggle(500);
  });

    var top_nav = $("#top-nav.hide");
    $(window).scroll(function() {
     var rol_height = $(document).scrollTop();
      if ( rol_height > 10) { top_nav.removeClass("hide"); }
      else { top_nav.addClass("hide"); }
 });

    $("#top-nav #nav-back").on('click', function(event) {
    event.preventDefault();
    /* Act on the event */
    window.history.back();
    });

    $("#top-nav #nav-share").on('click', function(event) {
    	event.preventDefault();
    	/* Act on the event */
    });
})
