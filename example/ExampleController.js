angular.module( 'example', ['responsive.services.listener','responsive.providers.width'
])


.controller( 'ExampleController', ['$scope','eeEventListener',function( $scope,listener ){
    $scope.test = "TEST!";

}]);