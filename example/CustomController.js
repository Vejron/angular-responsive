angular.module( 'custom', ['example'])

.controller( 'CustomController', ['$scope',function( $scope ){
        $scope.visibleClasses = ["show-small","show-medium","show-large"];
        $scope.hiddenClasses = ["hide-small","hide-medium","hide-large"];
        $scope.sizes = [
            {name:'small',desc:'<600px'},
            {name:'medium',desc:'≥600px'},
            {name:'large',desc:'≥1100px'}
            ]
        $scope.selected = 'custom';
}]).config(["widthOptionsProvider",function(provider) {
        var options = {widths:[{name:"small",minWidth:0,maxWidth:599},
            {name:"medium",minWidth:600,maxWidth:1099},
            {name:"large",minWidth:1100,maxWidth:Infinity}]
        };
        provider.setOptions(options);
}]).config(["responderRuleFactoryProvider",function(provider){
        var classes = {classes:[
            {name:"show-small", rule: {visible:["small"]}},
            {name:"show-medium", rule: {visible:["medium"]}},
            {name:"show-large", rule: {visible:["large"]}},
            {name:"hide-small", rule: {visible:["medium","large"]}},
            {name:"hide-medium", rule: {visible:["small","large"]}},
            {name:"hide-large", rule: {visible:["small","medium"]}}
        ]
        };
        provider.setResponderClasses(classes);
}]);
