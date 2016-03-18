'use strict';

var app = app || {};

app.userViews = (function(){
	function showLoginPage(selector){
		$.get('templates/login.html', function(templ){
			$(selector).html(templ)
		}).then(function() {
			$('#loginButton').on('click', function(e){
				var username = $('#username').val(),
					password = $('#password').val();

				Sammy(function() {
					this.trigger('login', {username: username, password: password});
				});
			});
		}).done();
	};

	function showRegisterPage(selector){
		$.get('templates/register.html', function(templ){
			$(selector).html(templ)
		}).then(function() {
			$('#registerButton').on('click', function(e){
				var username = $('#username').val(),
					password = $('#password').val(),
					fullName = $('#fullName').val();

				Sammy(function() {
					this.trigger('register', {username: username, password: password, fullName: fullName});
				});
			});
		}).done();
	};

	return{
		load: function(){
			return{
				showLoginPage: showLoginPage,
				showRegisterPage: showRegisterPage
			}
		}
	}
}());