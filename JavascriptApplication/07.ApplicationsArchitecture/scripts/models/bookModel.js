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

	return{
		load: function(requester){
			return new BookModel(requester);
		}
	}
}());