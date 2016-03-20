'use strict';

var app = app || {};

app.homeController = (function(){
	function HomeController(homeViewBag){
		this._homeViewBag = homeViewBag;
	}

	HomeController.prototype.loadLoginMenu = function(selector){
		this._homeViewBag.showLoginMenu(selector);
	};


	HomeController.prototype.loadHomeMenu = function(selector){
		this._homeViewBag.showHomeMenu(selector);
	};

	HomeController.prototype.loadWelcomePage = function(selector){
		this._homeViewBag.showWelcomePage(selector);
	};

	HomeController.prototype.loadHomePage = function(selector){
		var data = {
			username: sessionStorage['username']
		}
		this._homeViewBag.showHomePage(selector, data);
	};

	return {
		load: function(homeViewBag) {
			return new HomeController(homeViewBag);
		}
	}
}());