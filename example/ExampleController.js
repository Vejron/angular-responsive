angular.module( 'example', ['responsive.if'
])


.controller( 'ExampleController', ['$scope','$window',function( $scope,$window){
        $scope.width = $window.innerWidth;
        angular.element($window).on('resize', function(event){
            $scope.width = $window.innerWidth;
            $scope.$apply();
        });
}]);