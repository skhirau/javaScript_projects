angular.module("listApp")
    .controller('listAppController', ['$scope', 'listAppService', '$mdToast', function($scope, listAppService, $mdToast) {

            let repositoryName = null
                loadingGif = document.getElementById("loading-wrapper");
            function showOtherDiv(event){
                event.stopPropagation();
                document.getElementById("title").style.display = "block";
                document.getElementById("taskMenu").style.display = "block";
            };

            function hideOtherDiv(){
                document.getElementById("title").style.display = "none";
                document.getElementById("taskMenu").style.display = "none";
            };

            document.addEventListener('click', hideOtherDiv, false)
            document.getElementById("note").addEventListener('click', showOtherDiv, false);

            $scope.initilaize = function(){
                $scope.openIssues = null;
                $scope.averageAgeForIssue = null;
                $scope.oldestOpenIssueDate = null;
                $scope.latestOpenIssueDate = null;
                $scope.showStatistics = false;
                $scope.repositoryName = null;
                $scope.issueData = null;
                $scope.pagination = [];
                $scope.currentPage = 0;
            };

            $scope.getIssuesStatistics = function() {
                if ($scope.repositoryName != null) {
                    loadingGif.style.display = "block";
                    repositoryName = $scope.repositoryName;
                    $scope.initilaize();
                    listAppService.getDataForIssueStatistics(repositoryName)
                        .then(function(response) {
                            loadingGif.style.display = "none";
                            if(response["averageAge"].length === 0){
                                $scope.showStatistics = false;
                                $mdToast.show(
                                    $mdToast.simple()
                                    .textContent("No Data To Show")
                                    .position("top right")
                                    .hideDelay(3000)
                                );
                                return;
                            }
                            $scope.showStatistics = true;
                            $scope.issueData = response["averageAge"];
                            $scope.openIssues = response["open_issues"].hasOwnProperty("open_issues_count") ? response["open_issues"]["open_issues_count"] : null;
                            $scope.oldestOpenIssueDate = response["oldest"].length > 0 ? response["oldest"][0]["created_at"] : null;
                            $scope.latestOpenIssueDate = response["latest"].length > 0 ? response["latest"][0]["created_at"] : null;

                            let pagination = ($scope.openIssues/10) > parseInt($scope.openIssues/10) ? parseInt($scope.openIssues/10) + 1 : parseInt($scope.openIssues/10);
                            for(let i= 0; i< pagination; i++){
                                $scope.pagination.push(i);
                            }
                        }, function(err) {
                            loadingGif.style.display = "none";
                            $mdToast.show(
                                $mdToast.simple()
                                .textContent(err.data.message)
                                .position("bottom")
                                .hideDelay(3000)
                            );
                        });
            };

            $scope.getIssuesStatisticsOnPagination = function(index) {
                $scope.issueData = null;
                loadingGif.style.display = "block";
                $scope.currentPage = (index - 1)*10;
                if (repositoryName != null) {
                    listAppService.getDataForPagination(repositoryName, index)
                        .then(function(response) {
                            loadingGif.style.display = "none";
                            $scope.issueData = response;
                        }, function(err) {
                            loadingGif.style.display = "none";
                        });
                }
            };

        }
    }]);