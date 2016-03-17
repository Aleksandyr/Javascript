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
			$('#main').html('');
			bookController.loadAllBooks(selector);
		});


		//triggers
		this.bind('book', function(e, data){
			bookController.addBook(data);
		});
	});

	router.run('#/')
}());