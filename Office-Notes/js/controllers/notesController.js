'use strict';

var app = app || {};

app.notesController = (function(){
	function NotesController(notesViewBag, notesModel){
		this._notesViewBag = notesViewBag;
		this._notesModel = notesModel;
	}

	NotesController.prototype.loadNotesForToday = function(selector){
		var _this = this;
		var deadline = new Date().toISOString().substr(0, 10);
		this._notesModel.getAllNodesForToday(deadline)
			.then(function(successData){
				var result = {
					notes: []
				}

				successData.forEach(function(data){
					result.notes.push({
						title: data.title,
						author: data.author,
						text: data.text,
						deadline: data.deadline,
						id: data._id
					});
				});

				_this._notesViewBag.showOfficeNotes(selector, result);

			}).done();
	};

	NotesController.prototype.loadMyNotes = function(selector){
		var _this = this;
		var userId = sessionStorage['userId'];;
		this._notesModel.getMyNotes(userId)
			.then(function(successData){
				var result = {
					notes: []
				}

				successData.forEach(function(data){
					result.notes.push({
						title: data.title,
						author: data.author,
						text: data.text,
						deadline: data.deadline,
						id: data._id
					});
				});

				_this._notesViewBag.showMyNotes(selector, result);

			}).done();
	};

	NotesController.prototype.loadEditNote = function(selector, data){
		this._notesViewBag.showEditNote(selector, data);
	};

	NotesController.prototype.editNote = function(data){
		data.author = sessionStorage['username'];
		this._notesModel.editNote(data._id, data).
			then(function(successData){
				window.location.reload();
			});
	};

	NotesController.prototype.loadDeleteNote = function(selector, data){
		this._notesViewBag.showDeleteNote(selector, data);
	};

	NotesController.prototype.deleteNote = function(data){
		this._notesModel.deleteNote(data._id).
			then(function(successData){
				window.location.reload();
			});
	};

	NotesController.prototype.loadAddNotePage = function(selector){
		this._notesViewBag.showAddNotePage(selector);
	};

	NotesController.prototype.addNote = function(data){
		data.author = sessionStorage['username'];
		this._notesModel.addNote(data).
			then(function(successData){
				Sammy(function(){
					this.trigger('redirectUrl', {url: '#/myNotes/'})
				})
			});
	};

	return {
		load: function(notesViewBag, notesModel) {
			return new NotesController(notesViewBag, notesModel);
		}
	}
}());