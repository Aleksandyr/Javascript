'use strict';

var app = app || {};

(function(){
	var router = Sammy(function(){
		var selector = '#container';
		var requester = app.requester.config('kid_WyMOhIZnkZ', 'f8449c10b1dc4cee99963e75092d2cc4', 'https://baas.kinvey.com/');
		
		var userModel = app.userModel.load(requester);
		var notesModel = app.notesModel.load(requester);

		var userViewBag = app.userViews.load();
		var homeViewBag = app.homeViews.load();
		var notesViewBag = app.notesViews.load();	
		
		var homeController = app.homeController.load(homeViewBag);
		var userController = app.userController.load(userViewBag, userModel);
		var notesController = app.notesController.load(notesViewBag, notesModel);


		// Before
		this.before({except:{path:'#\/(login\/|register\/)?'}}, function() {
            if(!sessionStorage['sessionId']) {
                this.redirect('#/');
                return false;
            }
        });

		this.before(function(){
			if(!sessionStorage['sessionId']){
				$('#menu').hide();
			} else{
				$('#welcomeMenu').text('Welcome, ' + sessionStorage['username']);
				$('#menu').show();
			}
		})

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

		this.get('#/office/', function(){
			notesController.loadNotesForToday(selector);
		});

		this.get('#/myNotes/', function(){
			notesController.loadMyNotes(selector);
		});

		this.get('#/addNote/', function(e) {
			notesController.loadAddNotePage(selector);
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

		this.bind('showEditNote', function(e, data) {
			notesController.loadEditNote(selector, data);
		});

		this.bind('editNote', function(e, data) {
			notesController.editNote(data);
		});

		this.bind('showDeleteNote', function(e, data) {
			notesController.loadDeleteNote(selector, data);
		});

		this.bind('deleteNote', function(e, data) {
			notesController.deleteNote(data);
		});

		this.bind('addNote', function(e, data) {
			notesController.addNote(data);
		});
	});

	router.run('#/')
}());