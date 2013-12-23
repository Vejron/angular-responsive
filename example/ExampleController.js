angular.module( 'example', ['responsive.listener','responsive.responder.rule','responsive.width'
])


.controller( 'ExampleController', ['$scope','eeEventListener','options',function( $scope,listener,options ){
    $scope.test = "TEST!";

}]);