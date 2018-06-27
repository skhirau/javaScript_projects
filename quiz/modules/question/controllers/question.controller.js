angular.module("question")
    .controller('questionController', ['$scope', 'boardService', function($scope, boardService) {

    	$scope.question = null;

    	let currentQuestion = null;
    	$scope.$on("updateQuestion", function(event, data){
    		$scope.question = boardService.getValue.getQuestionData(data.index);
    		$scope.question.index = data.index;
    		if(!$scope.question.hasOwnProperty("selectedOption")){
    			$scope.question.selectedOption = -1;
    		}
    		currentQuestion = $scope.question;
    	})

    	$scope.selectOption = function(index){
    		$scope.question.selectedOption = index;
    	}

    	$scope.submit = function(){
    		boardService.setValue.updateQuestionData($scope.question.index, $scope.question);
    		$scope.$emit("goToNext", {index: $scope.question.index});
    	}

    	$scope.clear = function(){
    		$scope.question.selectedOption = -1;
    		boardService.setValue.updateQuestionData($scope.question.index, $scope.question);
    	}
    }]);