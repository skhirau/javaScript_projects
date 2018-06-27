angular.module("listApp")
	.directive('listApp', function() {
        return {
            restrict: 'E',
            templateUrl: 'modules/listApp/assets/views/listApp.html',
            controller: 'listAppController',
            scope: {}
        };
    });

