angular.module("header")
    .controller('headerController', ['$scope', function($scope) {
        $scope.showcategory = function(){
			$(".back").show();
			var a=$(".menuoptions").css("margin-left");
			if(a === '-280px'){
				$(".menuoptions").animate(
		            {"margin-left": "0px"},
		            "slow");
					$(".back").show("slow");
			}
			else if(a === '0px'){
				$(".menuoptions").animate(
		            {"margin-left": "-280px"},
		            "slow");
					$(".back").hide();
			}
		}
    }]);
