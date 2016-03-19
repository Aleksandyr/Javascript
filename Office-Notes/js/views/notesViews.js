'use strict';

var app = app || {};

app.notesViews = (function(){
	function showOfficeNotes(selector, data){
		$.get('templates/officeNoteTemplate.html', function(templ){
			var rendered = Mustache.render(templ, data);
			$(selector).html(rendered)
		});
	};

	function showMyNotes(selector, data){
		$.get('templates/myNoteTemplate.html', function(templ){
			var rendered = Mustache.render(templ, data);
			$(selector).html(rendered)
		}).then(function(){
			$('.edit').on('click', function(e){
				var noteId = $(this).parent().attr('data-id');

				var note = data.notes.filter(function(note){
					return note.id == noteId;
				});

				Sammy(function() {
					this.trigger('showEditNote', note[0]);
				});
			});

			$('.delete').on('click', function(e){
				var noteId = $(this).parent().attr('data-id');

				var note = data.notes.filter(function(note){
					return note.id == noteId;
				});

				Sammy(function() {
					this.trigger('showDeleteNote', note[0]);
				});
			});
		}).done();
	};

	function showEditNote(selector, data){
		$.get('templates/editNote.html', function(templ){
			var rendered = Mustache.render(templ, data);
			$(selector).html(rendered)
		}).then(function(){
			$('#editNoteButton').on('click', function(e){
				var title = $('#title').val(),
					text = $('#text').val(),
					deadline = $('#deadline').val(),
					id = $(this).parent().attr('data-id');

				Sammy(function() {
					this.trigger('editNote', {title: title, text: text, deadline: deadline, _id:id});
				});
			});
		}).done();
	};

	function showDeleteNote(selector, data){
		$.get('templates/deleteNote.html', function(templ){
			var rendered = Mustache.render(templ, data);
			$(selector).html(rendered)
		}).then(function(){
			$('#deleteNoteButton').on('click', function(e){
				var	id = $(this).parent().attr('data-id');
				
				Sammy(function() {
					this.trigger('deleteNote', {_id:id});
				});
			});
		}).done();
	};

	function showAddNotePage(selector, data){
		$.get('templates/addNote.html', function(templ){
			$(selector).html(templ)
		}).then(function(){
			$('#addNoteButton').on('click', function(e){
				var title = $('#title').val(),
					text = $('#text').val(),
					deadline = $('#deadline').val();
				
				Sammy(function() {
					this.trigger('addNote', {title:title, text: text, deadline: deadline});
				});
			});
		}).done();
	};


	return{
		load: function(){
			return{
				showOfficeNotes: showOfficeNotes,
				showMyNotes: showMyNotes,
				showEditNote: showEditNote,
				showDeleteNote: showDeleteNote,
				showAddNotePage: showAddNotePage
			}
		}
	}
}());