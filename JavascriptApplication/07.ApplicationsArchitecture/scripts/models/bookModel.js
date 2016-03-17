'use strcit';

var app = app || {};

app.bookModel = (function(){
	function BookModel(requester){
		this._requester = requester;
		this.serviceUrl = requester.baseUrl + 'appdata/' + requester.appId + '/books';
	}

	BookModel.prototype.getAllBooks = function(){
		return this._requester.get(this.serviceUrl);
	};

	BookModel.prototype.addNewBook = function(data){
		return this._requester.post(this.serviceUrl, data);
	};

	BookModel.prototype.deleteBook = function(data){
		var deleteBookUrl = this.serviceUrl + '/' + data.bookId;
		return this._requester.delete(deleteBookUrl);
	};

	BookModel.prototype.editBook = function(data){
		var editBookUrl = this.serviceUrl + '/' + data.bookId;
		return this._requester.put(editBookUrl, data);
	};

	return{
		load: function(requester){
			return new BookModel(requester);
		}
	}
}());