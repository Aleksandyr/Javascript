'use strict';

app.controller("studentsController", function($scope){
	var students = {
		pesho: {
		  "name": "Pesho",
		  "photo": "http://www.nakov.com/wp-content/uploads/2014/05/SoftUni-Logo.png",
		  "grade": 5,
		  "school": "High School of Mathematics",
		  "teacher": "Gichka Pesheva",
		},

		misho: {
		  "name": "Misho",
		  "photo": "http://www.nakov.com/wp-content/uploads/2014/05/SoftUni-Logo.png",
		  "grade": 5,
		  "school": "High School of Mathematics",
		  "teacher": "Gichka Pesheva",
		},

		tosho: {
		  "name": "Tosho",
		  "photo": "http://www.nakov.com/wp-content/uploads/2014/05/SoftUni-Logo.png",
		  "grade": 5,
		  "school": "High School of Mathematics",
		  "teacher": "Gichka Pesheva",
		},
	}

	$scope.students = students;
});