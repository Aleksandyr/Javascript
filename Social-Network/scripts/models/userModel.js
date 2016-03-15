'use strict';

var app = app || {};

app.userModel = (function(){
    function UserModel(requester){
        this._requester = requester;
        this.serviceUrl = requester.baseUrl + 'user/' + requester.appId;
    }

    UserModel.prototype.login = function(data){
        var loginUrl = this.serviceUrl + '/login';
        return this._requester.post(loginUrl, data);
    };

    UserModel.prototype.register = function(data){
        return this._requester.post(this.serviceUrl, data);
    };

    UserModel.prototype.editProfile = function(data, userId){
        var editProfileUrl = this.serviceUrl + '/' + userId;
        return this._requester.put(editProfileUrl, data, true);
    };

    UserModel.prototype.getById = function(userId){
        var getUserByIdUrl = this.serviceUrl + '/' + userId;
        return this._requester.get(getUserByIdUrl, null, true);
    };

    UserModel.prototype.getLoggedUser = function(){
        var getLoggedUser = this.serviceUrl + '/_me';
        return this._requester.get(getLoggedUser, null, true);
    };

    UserModel.prototype.logout = function(){
        var logoutUrl = this.serviceUrl + '/_logout';
        return this._requester.post(logoutUrl, null, true);
    };

    return {
        load: function(requester){
            return new UserModel(requester);
        }
    }
}());