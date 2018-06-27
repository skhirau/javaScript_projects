angular.module("question")
	.directive('question', function() {
        return {
            restrict: 'E',
            templateUrl: 'modules/question/assets/views/question.html',
            controller: 'questionController',
            scope: {}
        };
    });

