angular.module("header")
	.directive('header', function() {
        return {
            restrict: 'E',
            templateUrl: 'modules/header/assets/views/header.html',
            controller: 'headerController',
            scope: {}
        };
    });

