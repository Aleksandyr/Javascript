'use strict';

angular.module('VideoSystem')
	.service('VideoRepository', function(){
		this.videos = [
			{
				title: 'Angular introduction',
				pictureUrl: 'http://www.w3schools.com/angular/pic_angular.jpg',
				length: '3:32',
				category: 'AngluarJS',
				subscribers: 6,
				date: new Date(2015, 6, 15),
				haveSubtitles: false,
				likes: 19,
				comments: [
					{
						username: 'Pesho',
						content: 'Very good video',
						date: new Date(2015, 6, 15),
						websiteUrl: 'http://pesho.com/'
					},
					{
						username: 'Misho',
						content: 'You helped me a lot',
						date: new Date(2015, 6, 15),
						websiteUrl: 'http://misho.com/'
					}
				]
			},
			{
				title: 'JS course intro',
				pictureUrl: 'https://s3.amazonaws.com/ksr/projects/531755/photo-main.jpg',
				length: '29:31',
				category: 'JS',
				subscribers: 899,
				date: new Date(2015, 5, 9),
				haveSubtitles: true,
				likes: 19849865,
				comments: [
					{
						username: 'Gosho',
						content: 'Thank you',
						date: new Date(2015, 5, 10),
						websiteUrl: 'http://gosho.com/'
					}
				]
			}
		];
	})