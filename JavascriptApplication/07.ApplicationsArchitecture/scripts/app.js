'use strict';

var app = app || {};

(function(){
	var router = Sammy(function(){
		var selector = '#main';

		var requester = app.requester.config('kid_byqVFoMoyZ', '72150751d6f0489c963eb2df6b3fd305');

		var bookViewBag = app.bookViews.load();

		var bookModel = app.bookModel.load(requester);

		var bookController = app.bookController.load(bookModel, bookViewBag);

		this.get('#/', function(){
			bookController.loadAllBooks(selector);
		});

		this.get('#/addBook/', function(){
			bookController.loadAddBook(selector);
		});

		this.get('#/editBook/', function(){
			bookController.loadEditBook(selector);
		});


		//triggers

		this.bind('redirectUrl', function(e, data){
            this.redirect(data.url);
        });

		this.bind('addBook', function(e, data){
			bookController.addBook(data);
			$('#main').html('');
			Sammy(function(){
				this.trigger('redirectUrl', {url: '#/'})
			});
		});


		this.bind('removeBook', function(e, data){
			bookController.deleteBook(data);
			$('#main').html('');
			Sammy(function(){
				this.trigger('redirectUrl', {url: '#/'})
			});
		});

		this.bind('editBook', function(e, data){
            bookController.editBook(data);
            $('#main').html('');
			Sammy(function(){
				this.trigger('redirectUrl', {url: '#/'})
			});
        });
	});

	router.run('#/')
}());