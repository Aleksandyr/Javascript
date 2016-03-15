'use strict';

var app = app || {};

app.homeViews = (function(){
    function showHomePage(selector){
        $.get('templates/home.html', function(templ){
            var output = Mustache.render(templ);
            $(selector).html(output);
        })
    }

    function showGuestHomePage(selector){
        $.get('templates/guest-home.html', function(templ){
            var output = Mustache.render(templ);
            $(selector).html(output);
            $('#login-qst-btn').on('click', function(e){
                Sammy(function(){
                   this.trigger('redirectUrl', {url: '#/login/'});
                });
            });
        })
    }

    return{
        load: function() {
            return {
                showHomePage: showHomePage,
                showGuestHomePage: showGuestHomePage
            }
        }
    }
}());