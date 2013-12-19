angular.module( 'example', ['responsive.services.listener','responsive.providers.width'
])


.controller( 'ExampleController', ['$scope','eeEventListener',function( $scope,listener ){
    $scope.test = "TEST!";

}]).config(function(widthFactoryProvider) {
        var opts = {widths:[{minWidth:0,maxWidth:199},
            {minWidth:200,maxWidth:800}]
        };
        widthFactoryProvider.setOptions(opts);
    });