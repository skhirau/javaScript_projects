angular.module("listApp")
    .controller('listAppController', ['$scope', 'listAppService', function($scope, listAppService) {

        $scope.tasks = [];
        $scope.currentTask = null;
        $scope.showView = null;

        $scope.$watch(function() {
            return listAppService.listAppFunctions.getTasksLength()
        }, function(newValue, oldValue) {
            if (newValue !== oldValue && newValue !== 0) {
                $scope.tasks = listAppService.listAppFunctions.getAllTasks();
                if ($scope.currentTask === null) {
                    $scope.showView = "Info";
                    $scope.currentTask = $scope.tasks[0];
                }
            }
        });

        $scope.news = [{
                news: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                day: 21,
                month: "Jan"
            },
            {
                news: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                day: 21,
                month: "Feb"
            },
            {
                news: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                day: 21,
                month: "March"
            }
        ];

        $scope.posts = [
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry in year 2012.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry in year 2013.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry in year 2014."
        ];

        $scope.selectCurrentTask = function(currentTask) {
            $scope.currentTask = currentTask;
            document.getElementById("Task Info_background").style.display = "block";
        };

        $scope.changeView = function(type) {
            switch (type) {
                case "Info":
                    $scope.showView = "Info";
                    break;
                case "Action":
                    $scope.showView = "Action";
                    break;
                case "Document":
                    $scope.showView = "Document";
                    break;
                case "Attribute":
                    $scope.showView = "Attribute";
                    break;
            }
        };
    }]);