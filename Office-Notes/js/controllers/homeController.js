'use strict';

var app = app || {};

app.homeController = (function(){
	function HomeController(homeViewBag){
		this._homeViewBag = homeViewBag;
	}

	HomeController.prototype.loadWelcomePage = function(selector){
		this._homeViewBag.showWelcomePage(selector);
	};

	HomeController.prototype.loadHomePage = function(selector){
		var data = {
			fullName: sessionStorage['fullName'],
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