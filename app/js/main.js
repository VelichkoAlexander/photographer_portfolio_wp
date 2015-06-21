'use strict';
(function () {


    var app = {

        initialize: function () {
            this.setUpListeners();
            this.svgFallbak();


        },
        setUpListeners: function () {

        },

      svgFallbak:function(){
          if(!Modernizr.svg) {
              $("img[src*='svg']").attr("src", function() {
                  return $(this).attr("src").replace(".svg", ".png");
              });
          };
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
