'use strict';

var app = app || {};

app.bookController = (function(){
	function BookController(model, viewBag){
		this._model = model;
		this._viewBag = viewBag;
	}

	BookController.prototype.loadAllBooks = function(selector) {
		var _this = this;

		this._model.getAllBooks()
			.then(function (successData) {
				var result = {
					books: []
				};

				successData.forEach(function(book){
					result.books.push({title: book.title, author: book.author, isbn: book.isbn, bookId: book._id});
				});

				_this._viewBag.showAllBooksPage(selector, result);
			});
	};

	BookController.prototype.loadAddBook = function(selector) {
		var _this = this;

		_this._viewBag.showCreateBookPage(selector);
	};

	BookController.prototype.loadEditBook = function(selector) {
		var _this = this;

		_this._viewBag.showEditBookPage(selector);
	};

	BookController.prototype.addBook = function(data) {
		this._model.addNewBook(data)
			.then(function (successData) {
				Sammy(function(){
					this.trigger('redirectUrl', {url: '#/'});
				});
			}).done();
	};

	BookController.prototype.editBook = function(data) {
		this._model.editBook(data)
			.then(function (successData) {
				Sammy(function(){
					this.trigger('redirectUrl', {url: '#/'});
				});
			}).done();
	};

	BookController.prototype.deleteBook = function(data) {
		this._model.deleteBook(data)
			.then(function (successData) {
				Sammy(function(){
					this.trigger('redirectUrl', {url: '#/'});
				});
			}).done();
	};

	return {
		load: function(model, viewBag){
			return new BookController(model, viewBag);
		}
	}
}());