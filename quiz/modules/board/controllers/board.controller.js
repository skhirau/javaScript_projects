angular.module("board")
    .controller('boardController', ['$scope', 'boardService', '$mdToast', function($scope, boardService, $mdToast) {

        $scope.questionList = null;
        $scope.noNext = true;
        $scope.noPrev = true;
        let currentValue = 0;

        (function(){
            boardService.getValue.getQuestionsList()
                .then(function(response){
                    $scope.questionList = response;
                    $scope.noPrev = false;
                    $scope.$broadcast("updateQuestion", {
                        index: 0
                    });
                }, function(err){
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent("Please mark all answers")
                        .position("top right")
                        .hideDelay(3000)
                    );
                })
        })();

        $scope.$on("goToNext", function(ev, data){
            if(data.index === $scope.questionList.length - 1){
                return;
            }else{
                updateQuestionNumber(data.index + 1)
            }
        });

        function updateQuestionNumber(index){
            $scope.noNext = true;
            $scope.noPrev = true;
            currentValue = index;
            $scope.$broadcast("updateQuestion", {
                index: index
            });
            if(index === 0){
                $scope.noPrev = false;
            }
            else if(index === $scope.questionList.length - 1){
                $scope.noNext = false;
            }
        }

        $scope.next = function(){
            updateQuestionNumber(currentValue + 1)
        };

        $scope.previous = function(){
            updateQuestionNumber(currentValue - 1)
        };

        $scope.updateQuestion = function(index){
            if(currentValue === index)
                return;
            else{
                updateQuestionNumber(index)
            }
        };

        $scope.submitAll = function(){
            let showResult = boardService.actions.checkAllSubmitted();
            if(showResult){
                boardService.actions.generateGraph();
                document.getElementById("showQuizResult").style.display = "block";
            }else{
                $mdToast.show(
                    $mdToast.simple()
                    .textContent("Please mark all answers")
                    .position("top right")
                    .hideDelay(3000)
                );
            }
        }
    }]);