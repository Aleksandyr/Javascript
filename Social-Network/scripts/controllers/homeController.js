'use strict';

var app = app || {};

app.homeController = (function(){
    function HomeController(model, viewBag){
        this._model = model;
        this._viewBag = viewBag;
    }

    HomeController.prototype.loadGuestHomePage = function(selector){
        this._viewBag.loadGuestHomeView(selector);
    };

    HomeController.prototype.loadHomePage = function(selector, userId){
        var data = this._model.getById(userId);

        this._viewBag.loadHomeView(selector, data);
    };

    return{
        load: function(model, viewBag){
            return new HomeController(model, viewBag);
        }
    }
}());
