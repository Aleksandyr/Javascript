'use strict';

var app = app || {};

(function(){
	var router = Sammy(function(){
		var _this = this;
		var selector = '#container';
		var requester = app.requester.config('kid_-ysKOsET1b', '2390eda652944b25b1aa5e2209b6823e', 'https://baas.kinvey.com/');
		
		var userModel = app.userModel.load(requester);
		var lectureModel = app.lectureModel.load(requester);

		var homeViewBag = app.homeViews.load();
		var userViewBag = app.userViews.load();
		var lectureViews = app.lectureViews.load();
		
		var homeController = app.homeController.load(homeViewBag);
		var userController = app.userController.load(userViewBag, userModel);
		var lectureController = app.lectureController.load(lectureViews, lectureModel);

		// Before
		this.before({except:{path:'#\/(login\/|register\/)?'}}, function() {
            if(!sessionStorage['sessionId']) {
                this.redirect('#/');
                return false;
            }
        });

        this.before(function() {
            if(!sessionStorage['sessionId']) {
                homeController.loadLoginMenu('#menu');
            } else{
            	homeController.loadHomeMenu('#menu');
            }
        });

		// Routing
		this.get('#/', function(){
			homeController.loadWelcomePage(selector);
		});

		this.get('#/home/', function(){
			homeController.loadHomePage(selector);
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

		this.get('#/calendar/list/', function(){
			lectureController.loadLectures(selector);
		});

		this.get('#/calendar/my/', function(){
			lectureController.loadMyLectures(selector);
		});

		this.get('#/calendar/add/', function(){
			lectureController.loadAddLecturePage(selector);
		});

		this.get('#/calendar/:action/:id', function() {
			$('.modal-backdrop').remove();
			var id = this.params['id'];
            switch (this.params['action']) {
                case 'edit':
                    lectureController.loadEditLecuterPage(selector, id);
                    break;
                case 'delete':
                    lectureController.loadDeleteLecturePage(selector, id);
                    break;
            }
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

		this.bind('addLecture', function(e, data) {
			lectureController.addLecture(data);
		});

		this.bind('editLecture', function(e, data) {
			lectureController.editLecture(data);
		});

		this.bind('deleteLecture', function(e, data) {
			lectureController.deleteLecture(data);
		});
	});

	router.run('#/')
}());