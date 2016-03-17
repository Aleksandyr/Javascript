'use strict';

var app = app || {};

app.bookViews = (function(){
	function showAllBooksPage(selector, data){
		$.get('templates/showBooks.html', function(tmpl){
			var outp = Mustache.render(tmpl, data);
			$(selector).html(outp);
		}).then(function(){
			$('#delete-btn').on('click', function(e){
				var bookId = $(this).parent().parent().attr('id');

				var note = null;
				for(var item in data.books){
					if(data.books[item].bookId == bookId){
						note = data.books[item];
					}
				}

				Sammy(function(){
					this.trigger('removeBook', note);
				});
			});

			$('#edit-btn').on('click', function(e){
				var bookId = $(this).parent().parent().attr('id');

				var note = null;
				for(var item in data.books){
					if(data.books[item].bookId == bookId){
						note = data.books[item];
					}
				}

				Sammy(function(){
					this.trigger('editBook', note);
				});
			});
		}).done();
	}

	function showCreateBookPage(selector){
		$.get('templates/addBook.html', function(tmpl){
			$(selector).html(tmpl);
		}).then(function(){
			$('#book-sbmt-btn').on('click', function(e){
				var data = {
					title: $('#book-title').val(),
					author: $('#book-author').val(),
					isbn: $('#book-isbn').val(),
				};

				Sammy(function(){
					this.trigger('addBook', data);
				});
			});
		}).done();		
	}

	function showEditBookPage(selector){
		$.get('templates/editBook.html', function(tmpl){
			$(selector).html(tmpl);
		}).then(function(){
			$('#book-edit-sbmt-btn').on('click', function(e){
				var data = {
					title: $('#book-title').val(),
					author: $('#book-author').val(),
					isbn: $('#book-isbn').val(),
				};

				Sammy(function(){
					this.trigger('editBook', data);
				});
			});
		}).done();		
	}

	return{
		load: function(){
			return {
				showAllBooksPage: showAllBooksPage,
				showCreateBookPage: showCreateBookPage,
				showEditBookPage: showEditBookPage
			}
		}
	}
}());