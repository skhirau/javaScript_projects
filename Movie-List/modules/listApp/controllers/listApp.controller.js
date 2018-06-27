angular.module("listApp")
    .controller('listAppController', ['$scope', 'listAppService', '$mdToast', function($scope, listAppService, $mdToast) {

            let celebName = null
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
                $scope.showStatistics = false;
                $scope.celebName = null;
                $scope.moviesList = null;
            };

            $scope.getCelebList = function() {
                if ($scope.celebName != null) {
                    loadingGif.style.display = "block";
                    celebName = $scope.celebName;
                    $scope.initilaize();
                    listAppService.getDataForCeleb(celebName)
                        .then(function(response) {
                            loadingGif.style.display = "none";
                            if(response.length === 0){
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
                            $scope.moviesList = response.length > 0 ? response : [];
                        }, function(err) {
                            loadingGif.style.display = "none";
                            $mdToast.show(
                                $mdToast.simple()
                                .textContent(err)
                                .position("top right")
                                .hideDelay(3000)
                            );
                        });
            };

            let currentindex = null;

            $scope.delete = function(index){
                $scope.moviesList.splice(index, 1);
            };

            $scope.edit = function(index){
                currentindex = index;
                document.getElementById("masked").style.display = "block";
                $scope.selected = $scope.moviesList[index];
                $scope.movieName = undefined;
            };

            $scope.update = function(value){
                document.getElementById("masked").style.display = "none";
                $scope.movieName = undefined;
                $scope.moviesList[currentindex].title = value !== "" ? value : $scope.moviesList[currentindex].title;
            };

        }
    }]);