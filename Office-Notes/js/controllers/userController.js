'use strict';

var app = app || {};

app.userController = (function(){
	function UserController(userViewBag, userModel){
		this._userViewBag = userViewBag;
		this._userModel = userModel;
	}

	UserController.prototype.loadLoginPage = function(selector){
		this._userViewBag.showLoginPage(selector);
	};

	UserController.prototype.login = function(data) {
		this._userModel.login(data)
			.then(function(successData){
				setSessionStorage.call(this, successData);

				noty({
                        theme: 'relax',
                        text: 'Successfully logged in!',
                        type:'success',
                        timeout: 2000,
                        closeWith: ['click']
                    });

				Sammy(function(){
					this.trigger('redirectUrl', {url: '#/home/'})
				});

			}, function(error) {
                    noty({
                        theme: 'relax',
                        text: error.responseText,
                        type:'error',
                        timeout: 2000,
                        closeWith: ['click']
                    });
        });
	};

	UserController.prototype.loadRegisterPage = function(selector){
		this._userViewBag.showRegisterPage(selector);
	};

	UserController.prototype.register = function(data) {
		this._userModel.register(data)
			.then(function(successData){
				setSessionStorage.call(this, successData);

				Sammy(function(){
					this.trigger('redirectUrl', {url: '#/home/'})
				});
				
			}).done();
	};

	UserController.prototype.logout = function() {
		this._userModel.logout()
			.then(function(){
				sessionStorage.clear();

				Sammy(function(){
					this.trigger('redirectUrl', {url: '#/'})
				});
			}).done();
	};

	function setSessionStorage(data){
		sessionStorage['sessionId'] = data._kmd.authtoken;
		sessionStorage['username'] = data.username;
		sessionStorage['fullName'] = data.fullName;
		sessionStorage['userId'] = data._id;
	}

	return{
		load: function(userViewBag, userModel){
			return new UserController(userViewBag, userModel)
		}
	}
}());