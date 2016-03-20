'use strict';

var app = app || {};

app.lectureController = (function(){
	function LectureController(lectureViewBag, lectureModel){
		this._lectureViewBag = lectureViewBag;
		this._lectureModel = lectureModel;
	}

	LectureController.prototype.loadLectures = function(selector){
	var _this = this;
	this._lectureModel.getAllLectures()
		.then(function(successData){
			var result = {
				lectures: []
			}

			successData.forEach(function(data){
				result.lectures.push({
					title: data.title,
					start: data.start,
					end: data.end,
					lecturer: data.lecturer,
					id: data._id
				});
			});

			_this._lectureViewBag.showLectures(selector, result.lectures);

		}).done();
		
	};


	LectureController.prototype.loadMyLectures = function(selector){
		var _this = this;
		var userId = sessionStorage['userId'];
		this._lectureModel.getMyLectures(userId)
			.then(function(successData){
				var result = {
					lectures: []
				}

				successData.forEach(function(data){
					result.lectures.push({
						title: data.title,
						start: data.start,
						end: data.end,
						lecturer: data.lecturer,
						id: data._id
					});
				});

				_this._lectureViewBag.showLectures(selector, result.lectures, result);

			}).done();
	};

	LectureController.prototype.loadEditLecuterPage = function(selector, id){
		var _this = this;
		var data = this._lectureModel.getLectureById(id)
			.then(function(successData){
				var data = {
					title: successData.title,
					start: successData.start,
					end: successData.end,
					id: successData._id
				}
				_this._lectureViewBag.showEditLecture(selector, data);
			}).done();
	};

	LectureController.prototype.editLecture = function(data){
		data.lecturer = sessionStorage['username'];
		this._lectureModel.editLecture(data._id, data)
			.then(function() {
	                noty({
	                    theme: 'relax',
	                    text: 'Successfully edit Lecture!',
	                    type:'success',
	                    timeout: 2000,
	                    closeWith: ['click']
	                });
	                Sammy(function(){
						this.trigger('redirectUrl', {url: '#/calendar/my/'})
					})
	            }, function(error) {
	                noty({
	                    theme: 'relax',
	                    text: "Incorrect data!",
	                    type:'error',
	                    timeout: 2000,
	                    closeWith: ['click']
	                });
	                Sammy(function(){
						this.trigger('redirectUrl', {url: '#/calendar/my/'})
					})
	            });
	};

	LectureController.prototype.loadDeleteLecturePage = function(selector, id){
		var _this = this;
		var data = this._lectureModel.getLectureById(id)
			.then(function(successData){
				var data = {
					title: successData.title,
					start: successData.start,
					end: successData.end,
					id: successData._id
				}
				_this._lectureViewBag.showDeleteLecture(selector, data);
			}).done();
	};

	LectureController.prototype.deleteLecture = function(data){
		this._lectureModel.deleteLecture(data._id)
			.then(function() {
		                noty({
		                    theme: 'relax',
		                    text: 'Successfully delete Lecture!',
		                    type:'success',
		                    timeout: 2000,
		                    closeWith: ['click']
		                });
		                Sammy(function(){
							this.trigger('redirectUrl', {url: '#/calendar/my/'})
						})
		            }, function(error) {
		                noty({
		                    theme: 'relax',
		                    text: "Invalid operation!",
		                    type:'error',
		                    timeout: 2000,
		                    closeWith: ['click']
		                });
		                Sammy(function(){
							this.trigger('redirectUrl', {url: '#/calendar/my/'})
						})
		            });
	};

	LectureController.prototype.loadAddLecturePage = function(selector){
		this._lectureViewBag.showAddLecture(selector);
	};

	LectureController.prototype.addLecture = function(data){
		data.lecturer = sessionStorage['username'];
		this._lectureModel.addLecture(data)
			.then(function() {
                    noty({
                        theme: 'relax',
                        text: 'Successfully added Lecture!',
                        type:'success',
                        timeout: 2000,
                        closeWith: ['click']
                    });
                    Sammy(function(){
						this.trigger('redirectUrl', {url: '#/calendar/my/'})
					})
                }, function(error) {
                    noty({
                        theme: 'relax',
                        text: "Incorrect data!",
                        type:'error',
                        timeout: 2000,
                        closeWith: ['click']
                    });
                    Sammy(function(){
						this.trigger('redirectUrl', {url: '#/calendar/my/'})
					})
                });
	};

	return {
		load: function(lectureViewBag, lectureModel) {
			return new LectureController(lectureViewBag, lectureModel);
		}
	}
}());