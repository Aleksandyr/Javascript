'use strcit';

var app = app || {};

app.notesModel = (function(){
	function NotesModel(requester){
		this._requester = requester;
		this._serviceUrl = requester.baseUrl + 'appdata/' + requester.appId + '/notes/';
	}

	NotesModel.prototype.getAllNodesForToday = function(deadline) {
		var serviceUrl = this._serviceUrl + '?query{"deadline":"' + deadline + '"}/';
		
		return this._requester.get(serviceUrl);
	};

	NotesModel.prototype.getMyNodes = function(userId) {
		var serviceUrl = this._serviceUrl + '?query{"_acl.creator":"' + userId + '"}/';

		return this._requester.get(this._serviceUrl, data);
	};

	NotesModel.prototype.addNote = function(data) {	
		return this._requester.post(this._serviceUrl, data, true);
	};

	NotesModel.prototype.editNodes = function(noteId, data) {	
		var editNodeUrl = this._serviceUrl + noteId;

		return this._requester.put(editNodeUrl, data, true);
	};

	NotesModel.prototype.editNodes = function(noteId) {	
		var deleteNodeUrl = this._serviceUrl + noteId;

		return this._requester.delete(deleteNodeUrl, true);
	};

	return{
		load: function(requester){
			return new NotesModel(requester)
		}
	}
}());