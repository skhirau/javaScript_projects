angular.module("addTask")
    .directive('addTask', function() {
        return {
            restrict: 'E',
            templateUrl: 'modules/addTask/assets/views/addTask.html',
            controller: 'addTaskController',
            scope: {}
        };
    });
