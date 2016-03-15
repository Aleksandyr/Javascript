'use strict';

var app = app || {};

app.homeController = (function(){
    function HomeController(model, viewBag){
        this._model = model;
        this._viewBag = viewBag;
    }

    HomeController.prototype.loadGuestHomePage = function(selector){
        this._viewBag.showGuestHomePage(selector);
    };

    HomeController.prototype.loadHomePage = function(selector){
        var data = {
            username: sessionStorage['username'],
            name: sessionStorage['name'],
            picture: sessionStorage['picture']
        };
        
        this._viewBag.showHomePage(selector, data);
    };

    return{
        load: function(model, viewBag){
            return new HomeController(model, viewBag);
        }
    }
}());
