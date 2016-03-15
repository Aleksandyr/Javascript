'use strict';

var app = app || {};

(function(){
    var router = Sammy(function(){
       var selector = '#main';

        var reguester = app.requester.config('kid_-yDXfVjOJ-', 'fbeba0bfe5be43698b502a5251f7332c');
        var noty = app.noty.load();

        var homeViewBag = app.homeViews.load();
        var userViewBag = app.userViews.load();

        var userModel = app.userModel.load(reguester);

        var homeController = app.homeController.load(userModel, homeViewBag);
        var userController = app.userController.load(userModel, userViewBag);


        this.get('#/', function(){
            homeController.loadGuestHomePage(selector);
        });

        this.get('#/home/', function(){
            homeController.loadHomePage('#header');
        });

        this.get('#/login/', function(){
            userController.loadLoginPage(selector);
        });

        this.get('#/register/', function(){
            userController.loadRegisterPage(selector);
        });


        this.bind('login', function(e, data){
           userController.login(data);
        });

        this.bind('register', function(e, data){
            userController.register(data);
        });

        this.bind('redirectUrl', function(e, data){
            this.redirect(data.url);
        })
    });

    function checkIfUserIsLoggedIn(){
        this.before('\#\/[a-zA-Z0-9/]+', function(){
            var userId = sessionStorage['userId'];
            if(!userId){
                this.redirect('#/');
                return false;
            }
        })
    }

    router.run('#/');
}());