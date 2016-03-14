'use strict';

var app = app || {};

(function(){
    var router = Sammy(function(){
       var selector = '#main';

        var reguester = app.requester.config('kid_-yDXfVjOJ-', 'fbeba0bfe5be43698b502a5251f7332c');

        var userViewBag = app.homeViews.load();

        var userModel = app.userModel.load(reguester);

        var homeController = app.homeController.load(userModel, userViewBag);

        this.get('#/', function(){
            homeController.loadGuestHomePage(selector);
        });

        this.get('#/home/', function(){
            homeController.loadHomePage('#header');
        });
    });

    router.run('#/');
}());