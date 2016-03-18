'use strict';

var app = app || {};

(function(){
	var router = Sammy(function(){
		var selector = '#container';
		var requester = app.requester.config('kid_WyMOhIZnkZ', 'f8449c10b1dc4cee99963e75092d2cc4', 'https://baas.kinvey.com/');
		
		var userModel = app.userModel.load(requester);

		var userViewBag = app.userViews.load();	
		
		var userController = app.userController.load(userViewBag, userModel);

		// Before
		this.before(function(){
			if(!sessionStorage['sessionId']){
				$('#menu').hide();
			} else{
				$('#menu').show();
			}
		})

		// Routing
		this.get('#/', function(){

		});

		this.get('#/home/', function(){

		});

		this.get('#/login/', function(){
			userController.loadLoginPage(selector);
		});	

		this.get('#/register/', function(){
			userController.loadRegisterPage(selector);
		});

		this.get('#/logout/', function(){
			userController.logout();
		});

		// Triggers
		this.bind('redirectUrl', function(e, data) {
			this.redirect(data.url);
		});

		this.bind('login', function(e, data) {
			userController.login(data);
		});

		this.bind('register', function(e, data) {
			userController.register(data);
		});
	});

	router.run('#/')
}());