angular.module("widget", [])
	.directive('customWhiteframe', function() {
	    return {
	        restrict: 'E',
	        scope: {
	            name: '@'
	        },
	        transclude: true,
	        replace: true,
	        template: '<div class="maskedBackground" id="masked">'+
	        '<div class="complete-content whiteFrameMainClass" id="whiteframe1" aria-label="{{name}}" ng-cloak>' +
	            '<div class="toolBar">' +
		            '<div layout="row">' +
			            '<div class="col-md-8 col-lg-8 col-sm-6 col-xs-6 pull-left">' +
				            '<span>{{name}}</span>' +
			            '</div>' +
			            '<div class="col-md-4 col-lg-4 col-sm-6 col-xs-6 pull-right" style="margin:0; padding:0; margin-top:5px;">' +
				            '<button aria-label="Close" ng-click="checkOnClose()" class="icon-button btn btn-default">' +
				            '<i class="fa fa-times"></i>' +
				            '</button>' +
			            '</div>' +
			        '</div>' +
	            '</div>' +
	            '<div ng-cloak layout="row">' +
	            	'<ng-transclude></ng-transclude>' +
	            '</div>' +
	            '</div>' +
	            '</div>',
	        controller: function($scope, $element, $attrs) {
	            let whiteFrameWid = $element[0];
	            let whiteframeName = $attrs.name;

	            $scope.checkOnClose = function() {
                    whiteFrameWid.style.display = "none";
                    whiteFrameWid.children[0].classList.remove("fullWhiteFrameMainClass");
	            	whiteFrameWid.children[0].classList.add("whiteFrameMainClass");
	            };
	        },
	        compile: function(elem, attr) {

	            return {
	                pre: function(scope, elem, attr) {

	                },
	                post: function(scope, elem, attr) {
	                	document.body.appendChild(elem[0]);

	                }
	            };
	        }
	    };
	});