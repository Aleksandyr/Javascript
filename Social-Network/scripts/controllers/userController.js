'use strict';

var app = app || {};

app.userController = (function(){
    function UserController(model, viewBag){
        this._model = model;
        this._viewBag = viewBag;
    }

    UserController.prototype.loadLoginPage = function(selector){
        this._viewBag.showLoginPage(selector);
    };

    UserController.prototype.loadRegisterPage = function(selector){
        this._viewBag.showRegisterPage(selector);
    };

    UserController.prototype.loadEditProfilePage = function(selector){
        var data = {
            username: sessionStorage.username,
            name: sessionStorage.name,
            about: sessionStorage.about,
            gender: sessionStorage.gender
        };

        this._viewBag.showEditProfilePage(selector, data);
    };

    UserController.prototype.login = function(data){
        this._model.login(data)
            .then(function(successData){
                setUserToStorage(successData);
                Sammy(function(){
                    this.trigger('redirectUrl', {url: '#/home/'});
                });
            }).done();
    };

    UserController.prototype.register = function(data){
        this._model.register(data)
            .then(function(successData){
                setUserToStorage(successData);
                Sammy(function(){
                    this.trigger('redirectUrl', {url: '#/home/'});
                });
            }).done();
    };

    UserController.prototype.editProfile = function(data){
        this._model.editProfile(data)
            .then(function(successData){
                setUserToStorage(successData);
                Sammy(function(){
                    this.trigger('redirectUrl', {url: '#/home/'});
                });
            }).done();
    };

    UserController.prototype.logout = function(){
        clearUserFromStorage();
        Sammy(function(){
            this.trigger('redirectUrl', {url: '#/'});
        });
    };

    function setUserToStorage(data){
        sessionStorage['userId'] = data._id;
        sessionStorage['username'] = data.username;
        sessionStorage['name'] = data.name;
        sessionStorage['about'] = data.about;
        sessionStorage['gender'] = data.gender;
        sessionStorage['picture'] = data.picture;
        sessionStorage['sessionAuth'] = data._kmd.authtoken;
    }

    function clearUserFromStorage(){
        delete sessionStorage['userId'];
        delete sessionStorage['username'];
        delete sessionStorage['name'];
        delete sessionStorage['about'];
        delete sessionStorage['gender'];
        delete sessionStorage['picture'];
        delete sessionStorage['sessionAuth'];
    }

    return {
        load: function(model, viewBag){
            return new UserController(model, viewBag)
        }
    }
}());

