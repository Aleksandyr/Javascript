'use strict';

var app = app || {};

app.bookViews = (function(){
	function showAllBooksPage(selector, data){
		$.get('templates/books.html', function(tmpl){
			var outp = Mustache.render(tmpl, data);
			$(selector).html(outp);
		}).then(function(){
			$('#bookButton').on('click', function(e){
				$('#book-box').toggle(500);
			});

			$('#book-sbmt-btn').on('click', function(e){
				var data = {
					title: $('#book-title').val(),
					author: $('#book-author').val(),
					isbn: $('#book-isbn').val(),
				};

				Sammy(function(){
					this.trigger('book', data);
				});

				Sammy(function(){
					this.trigger('redirectUrl', {url: '#/'})
				})
			});
		}).done();
	}

	return{
		load: function(){
			return {
				showAllBooksPage: showAllBooksPage
			}
		}
	}
}());