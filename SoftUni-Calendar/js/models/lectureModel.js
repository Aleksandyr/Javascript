'use strcit';

var app = app || {};

app.lectureModel = (function(){
	function LectureModel(requester){
		this._requester = requester;
		this._serviceUrl = requester.baseUrl + 'appdata/' + requester.appId + '/lectures/';
	}

	LectureModel.prototype.getAllLectures = function() {
		return this._requester.get(this._serviceUrl, true);
	};

	LectureModel.prototype.getLectureById = function(lectureId) {
		var getByIdUrl = this._serviceUrl + lectureId;
		
		return this._requester.get(getByIdUrl, true);
	};

	LectureModel.prototype.getMyLectures = function(userId) {
		var getMyLecturesUrl = this._serviceUrl + '?query={"_acl.creator":"' + userId + '"}';

		return this._requester.get(getMyLecturesUrl, true);
	};

	LectureModel.prototype.addLecture = function(data) {	
		return this._requester.post(this._serviceUrl, data, true);
	};

	LectureModel.prototype.editLecture = function(lectureId, data) {	
		var editNodeUrl = this._serviceUrl + lectureId;

		return this._requester.put(editNodeUrl, data, true);
	};

	LectureModel.prototype.deleteLecture = function(lectureId) {	
		var deleteLectureUrl = this._serviceUrl + lectureId;

		return this._requester.delete(deleteLectureUrl, true);
	};

	return{
		load: function(requester){
			return new LectureModel(requester)
		}
	}
}());