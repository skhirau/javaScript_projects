angular.module("widget", [])
	.directive('customWhiteframe', function() {
	    return {
	        restrict: 'E',
	        scope: {
	            name: '@'
	        },
	        transclude: true,
	        replace: true,
	        template: '<div class="maskedBackground" id="whiteframe0">'+
	        '<div class="complete-content whiteFrameMainClass" id="whiteframe1" aria-label="{{name}}" ng-cloak ng-init="initalize()">' +
	            '<div class="toolBar" id="whiteframe2">' +
		            '<div layout="row">' +
			            '<div class="col-md-8 col-lg-8 col-sm-6 col-xs-6 pull-left">' +
				            '<span>{{name}}</span>' +
			            '</div>' +
			            '<div class="col-md-4 col-lg-4 col-sm-6 col-xs-6 pull-right" style="margin:0; padding:0; margin-top:5px;">' +
				            '<button id="whiteframe3" aria-label="Close" ng-click="checkOnClose()" class="icon-button btn btn-default">' +
				            '<i class="fa fa-times"></i>' +
				            '</button>' +
				            '<button ng-click="minimize();" id="whiteframe4" ng-show="condition" aria-label="Minimize" class="icon-button btn btn-default">' +
				            '<i class="fa fa-clone"></i>' +
				            '</button>' +
				            '<button ng-click="maximize();" id="whiteframe5" ng-show="!condition" aria-label="Maximize" class="icon-button btn btn-default">' +
				            '<i class="fa fa-square-o"></i>' +
				            '</button>' +
			            '</div>' +
			        '</div>' +
	            '</div>' +
	            '<div ng-cloak layout="row" class="minimizeAreaClass">' +
	            	'<ng-transclude class="minimizeSubAreaClass"></ng-transclude>' +
	            '</div>' +
	            '</div>' +
	            '</div>',
	        controller: function($scope, $element, $attrs) {
	            let whiteFrameWid = $element[0];
	            let whiteframeName = $attrs.name;

	            $scope.initalize = function(){
	            	$scope.condition = false;
	            };

	            $scope.checkOnClose = function() {
                    whiteFrameWid.style.display = "none";
                    whiteFrameWid.children[0].classList.remove("fullWhiteFrameMainClass");
	            	whiteFrameWid.children[0].classList.add("whiteFrameMainClass");
	            };

	            $scope.minimize = function() {
	            	whiteFrameWid.children[0].classList.remove("fullWhiteFrameMainClass");
	            	whiteFrameWid.children[0].classList.add("whiteFrameMainClass");
	                $scope.condition = false;
	            };

	            $scope.maximize = function() {
	            	whiteFrameWid.children[0].classList.remove("whiteFrameMainClass");
	                whiteFrameWid.children[0].classList.add("fullWhiteFrameMainClass");
	                $scope.condition = true;
	            };
	        },
	        compile: function(elem, attr) {

	            return {
	                pre: function(scope, elem, attr) {
	                    let whiteframeName = attr.name;
	                    document.getElementById("whiteframe0").setAttribute("id", whiteframeName + "_background");
	                    document.getElementById("whiteframe1").setAttribute("id", whiteframeName + "_popup");
	                    document.getElementById("whiteframe2").setAttribute("id", whiteframeName + "_popup_bar");
	                    document.getElementById("whiteframe3").setAttribute("id", whiteframeName + "_popup_bt_close");
	                    document.getElementById("whiteframe4").setAttribute("id", whiteframeName + "_popup_min");
	                    document.getElementById("whiteframe5").setAttribute("id", whiteframeName + "_popup_max");
	                },
	                post: function(scope, elem, attr) {
	                	document.body.appendChild(elem[0]);

	                }
	            };
	        }
	    };
	});
