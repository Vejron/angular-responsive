angular.module( 'example', ['responsive.if','responsive.responder'])


.controller( 'ExampleController', ['$scope','$window','responderFactory',function( $scope,$window,responderFactory){
        $scope.width = $window.innerWidth;
        angular.element($window).on('resize', function(event){
            $scope.width = $window.innerWidth;
            $scope.$apply();
        });
        $scope.visible = {}
        $scope.hidden = {}
        $scope.loaded = false;
        var buildResponseFunction = function(responseClass,target){
            return function(response){
                target[responseClass] = response;
                if ($scope.loaded){
                    $scope.$apply();
                }
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

        $scope.loaded = true;
}]);