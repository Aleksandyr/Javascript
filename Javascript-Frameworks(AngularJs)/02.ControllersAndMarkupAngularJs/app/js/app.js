'use strict';

(function(){
	angular.module('VideoSystem', [])
		.controller('VideosViewModel', [
				'$scope',
				'VideoRepository',
				function($scope, videoRepository){
					$scope.videos = videoRepository.videos;

					$scope.dateFilter = function(video){
						return !$scope.dateSearch || (video.date.toDateString() === $scope.dateSearch.toDateString());
				}
			}
		])
		.controller('VideoSystemViewModel', [
				'$scope',
				'VideoRepository',
				function($scope, videoRepository){
					$scope.submit = function(){
						$scope.newVideo.comments = [];
						videoRepository.videos.push($scope.newVideo);
						$scope.newVideo = {};
						$('#add-video-modal').modal('hide');
				}
			}
		]);
}());