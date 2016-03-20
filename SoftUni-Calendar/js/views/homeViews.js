'use strict';

var app = app || {};

app.homeViews = (function(){

	function showLoginMenu(selector){
		$.get('templates/menu-login.html', function(templ){
			$(selector).html(templ)
		});
	};

	function showHomeMenu(selector){
		$.get('templates/menu-home.html', function(templ){
			$(selector).html(templ)
		});
	};

	function showWelcomePage(selector){
		$.get('templates/welcome-guest.html', function(templ){
			$(selector).html(templ)
		});
	};

	function showHomePage(selector, data){
		$.get('templates/welcome-user.html', function(templ){
			var rendered = Mustache.render(templ, data);
			$(selector).html(rendered)
		})
	};

	return{
		load: function(){
			return{
				showWelcomePage: showWelcomePage,
				showHomePage: showHomePage,
				showLoginMenu: showLoginMenu,
				showHomeMenu: showHomeMenu
			}
		}
	}
}());