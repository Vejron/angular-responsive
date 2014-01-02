angular.module( 'example', ['responsive.listener','responsive.responder.rule','responsive.width','responsive.class','responsive.if'
])


.controller( 'ExampleController', ['$scope','eeEventListener','options','$window',function( $scope,listener,options,$window ){
        $scope.classes = ["visible-xs","visible-sm","visible-md","visible-lg","hidden-xs","hidden-sm","hidden-md","hidden-lg"];
        $scope.width = $window.innerWidth;
        angular.element($window).on('resize', function(event){
            $scope.width = $window.innerWidth;
            $scope.$apply();
        });
}]);