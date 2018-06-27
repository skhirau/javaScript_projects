angular.module("showTask")
	.directive('showTask', function(listAppService) {
        return {
            restrict: 'E',
            templateUrl: 'modules/showTask/assets/views/showTask.html',
            controller: 'showTaskController',
            link: function(scope, elem, attrs) {
            	let taskId = attrs.taskIndex;
            	let task = listAppService.listAppFunctions.getTaskByIndex(taskId);
            	scope.task = task;
            },
            scope: {}
        };
    });

