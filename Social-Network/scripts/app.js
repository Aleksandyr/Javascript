'use strict';

var app = app || {};

(function(){
    var router = Sammy(function(){
       var selector = '#main';

        var reguester = app.requester.config('kid_-yKqDJtK1-', 'f30bcb0176aa4ce1b2f8855363632f8c');
        var noty = app.noty.load();

        var homeViewBag = app.homeViews.load();
        var userViewBag = app.userViews.load();

        var userModel = app.userModel.load(reguester);

        var homeController = app.homeController.load(userModel, homeViewBag);
        var userController = app.userController.load(userModel, userViewBag);

        this.before(function(){
            var sessionAuth = sessionStorage['sessionAuth'];
            if(sessionAuth){
                $('header').show();
            } else{
                $('header').hide();
            }
        });

        this.before('#/', function(){
            var sessionAuth = sessionStorage['sessionAuth'];
            if(sessionAuth) {
                this.redirect('#/home/');
                return false;
            }
        });

        this.before('#/home/', function(){
            checkIfUserIsLoggedIn();
        });

        this.before('#/editProfile/', function(){
            checkIfUserIsLoggedIn();
        });

        this.before('#/login/', function(){
            var sessionAuth = sessionStorage['sessionAuth'];
            if(sessionAuth) {
                this.redirect('#/home/');
                return false;
            }
        });

        this.before('#/logout/', function(){
            checkIfUserIsLoggedIn();
        });

        this.before('#/register/', function(){
            var sessionAuth = sessionStorage['sessionAuth'];
            if(sessionAuth) {
                this.redirect('#/home/');
                return false;
            }
        });

        this.get('#/', function(){
            homeController.loadGuestHomePage(selector);
        });

        this.get('#/home/', function(){
            $('#main').html('');
            homeController.loadHomePage('#header');
        });

        this.get('#/login/', function(){
            userController.loadLoginPage(selector);
        });

        this.get('#/register/', function(){
            userController.loadRegisterPage(selector);
        });

        this.get('#/editProfile/', function(){
            userController.loadEditProfilePage('#header');
        });

        this.get('#/logout/', function(){
            $('header').html('');
            userController.logout();
        });


        this.bind('login', function(e, data){
           userController.login(data);
        });

        this.bind('register', function(e, data){
            userController.register(data);
        });

        this.bind('editProfile', function(e, data){
            userController.editProfile(data);
        });

        this.bind('redirectUrl', function(e, data){
            this.redirect(data.url);
        })
    });

    function checkIfUserIsLoggedIn(){
        var sessionAuth = sessionStorage['sessionAuth'];
        if(!sessionAuth){
            this.redirect('#/');
            return false;
        }
    }

    router.run('#/');
}());