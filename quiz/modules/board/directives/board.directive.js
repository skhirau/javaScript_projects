angular.module("board")
	.directive('board', function() {
        return {
            restrict: 'E',
            templateUrl: 'modules/board/assets/views/board.html',
            controller: 'boardController',
            scope: {}
        };
    });

