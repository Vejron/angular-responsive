angular.module( 'example', ['responsive.if','responsive.responder'])


.controller( 'ExampleController', ['$scope','$window','responderFactory',function( $scope,$window,responderFactory){
        $scope.width = $window.innerWidth;
        angular.element($window).on('resize', function(event){
            $scope.width = $window.innerWidth;
            $scope.$digest();
        });
        $scope.visible = {}
        $scope.hidden = {}
        var buildResponseFunction = function(responseClass,target){
            return function(response){
                target[responseClass] = response;
                $scope.visible = $scope.visible;
            }
        }
        var addResponders = function(classList,target){
            for (var i = 0; i < classList.length; i++) {
                var visibleClass = classList[i];
                var responder = responderFactory.getBooleanResponder(visibleClass);
                responder.registerTrigger(buildResponseFunction(visibleClass,target))
            }
        }
        addResponders($scope.visibleClasses,$scope.visible);
        addResponders($scope.hiddenClasses,$scope.hidden);

        var responder = responderFactory.getStringResponder(
            [{classes:'visible-xs',response:'includes/exampleIncludes/xsmall.tpl.html'},
             {classes:'visible-sm',response:'includes/exampleIncludes/small.tpl.html'},
             {classes:'visible-md',response:'includes/exampleIncludes/medium.tpl.html'},
             {classes:'visible-lg',response:'includes/exampleIncludes/large.tpl.html'}
        ]);
        var ngIncludeTrigger = function(response){
            $scope.ngInclude = response;
        };
        responder.registerTrigger(ngIncludeTrigger);
        $scope.loaded = true;
}]);