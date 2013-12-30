angular.module( 'example', ['responsive.listener','responsive.responder.rule','responsive.width','responsive.class','responsive.if'
])


.controller( 'ExampleController', ['$scope','eeEventListener','options',function( $scope,listener,options ){
    $scope.test = "TEST!";
    $scope.bbb = true;
}]);