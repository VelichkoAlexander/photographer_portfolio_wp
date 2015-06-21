'use strict';
(function () {


    var app = {

        initialize: function () {
            this.setUpListeners();
            this.svgFallbak();
            this.niceScrolle();
            this.freeWall();
            this.lazyLoad();


        },
        setUpListeners: function () {
            $(".btn_mnu").click(function () {
                $(this).toggleClass("active");
                $(".left_side").toggleClass("active");
            });
        },

        svgFallbak: function () {
            if (!Modernizr.svg) {
                $("img[src*='svg']").attr("src", function () {
                    return $(this).attr("src").replace(".svg", ".png");
                });
            }
            ;
        },
        niceScrolle: function () {
            $("body, .left_side").niceScroll({
                horizrailenabled: false
            })
        },
        freeWall: function () {
            var wall = new freewall(".gallery");
            wall.reset({
                selector: "a",
                animate: true,
                cellW: 150,
                cellH: "auto",
                gutterX: 5,
                gutterY: 5,
                onResize: function () {
                    wall.fitWidth();
                }
            });

            var images = wall.container.find("a");
            images.find("img").load(function () {
                wall.fitWidth();
            }).parent().hover(function(){
                $(".gallery a").css("opacity",".6");
                $(this).css("opacity","1");
                }, function(){
                $(".gallery a").css("opacity","1");
            });
        },
        lazyLoad: function () {
            $(".gallery img").lazyload({
                effect: "fadeIn"
            });
        },
        submitForm: function (e) {
            $("input,select,textarea").not("[type=submit]").jqBootstrapValidation();
            e.preventDefault();
            console.log($('.help-block li').length);
            if (!($('.help-block  li').length)) {

                $.ajax({
                    type: "POST",
                    url: "mail.php",
                    data: $(this).serialize()
                }).done(function () {
                    $(this).find("input").val("");
                    alert("Спасибо за заявку! Скоро мы с вами свяжемся.");
                    $("#form").trigger("reset");
                });
            }


        }

    };
    app.initialize();
}());
$(window).load(function () {

    $(".loader_inner").fadeOut();
    $(".loader").delay(400).fadeOut("slow");

});