'use strict';

var app = app || {};

app.homeViews = (function(){
    function loadHomeView(selector){
        $.get('templates/home.html', function(templ){
            var output = Mustache.render(templ);
            $(selector).html(output);
        })
    }

    function loadGuestHomeView(selector){
        $.get('templates/guest-home.html', function(templ){
            var output = Mustache.render(templ);
            $(selector).html(output);
        })
    }

    return{
        load: function() {
            return {
                loadHomeView: loadHomeView,
                loadGuestHomeView: loadGuestHomeView
            }
        }
    }
}());