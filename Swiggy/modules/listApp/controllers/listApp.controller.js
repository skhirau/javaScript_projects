angular.module("listApp")
    .controller('listAppController', ['$scope', 'listAppService', '$document', function($scope, listAppService, $document) {

            let currentIndex = 0;
            $scope.selectPlayerName = null;

            $scope.update = function(index){
                currentIndex = index;
                let playerName = $scope.showPlayers[currentIndex].name;
                $scope.selectPlayerName = playerName;
            }

            $document.bind("keydown", function($event) {
                if($scope.showAutoCompleteValues === true){
                    if (event.keyCode === 40) {
                        if(currentIndex >= 0 && currentIndex<$scope.showPlayers.length - 1){
                            currentIndex++;
                            let playerName = $scope.showPlayers[currentIndex].name;
                            $scope.selectPlayerName = playerName;
                            $scope.$apply(function(){})
                        }
                    }else if (event.keyCode === 38){
                        if(currentIndex > 0 && currentIndex<$scope.showPlayers.length){
                            currentIndex--;
                            let playerName = $scope.showPlayers[currentIndex].name;
                            $scope.selectPlayerName = playerName;
                            $scope.$apply(function(){})
                        }
                    }
                    else if (event.keyCode === 13){
                        $scope.fill($scope.showPlayers[currentIndex])
                        $scope.$apply(function(){})
                    }
                }
            });

            $scope.showAuto = function(){
                $scope.showAutoCompleteValues = true;
                currentIndex = 0;
            }

            $scope.fill = function(player){
                if(!$scope.selected.hasOwnProperty(player.name)){
                   $scope.selected[player.name] = player;
                }                    
                hideAuto()
            }

            function hideAuto(){
                $scope.showAutoCompleteValues = false;
            }
            
            $scope.teams = [];
            $scope.selected = {};
            $scope.players = [];
            $scope.showPlayers = [];
            $scope.showAutoCompleteValues = false;
            $scope.autoComplete = false

            ;(function(){
                listAppService.getTeam()
                    .then(function(response){
                        $scope.teams = response.team;
                        $scope.players = response.player;
                    })
            })();

            $scope.showTeamList = function(id){
                $scope.showPlayers = [];
                $scope.showPlayers = $scope.players.filter(value => parseInt(value.teamId) === id)
                $scope.selectPlayerName = $scope.showPlayers[0].name
                $scope.autoComplete = true;
            }

    }]);