angular.module( 'custom', ['example','responsive.width'])

.controller( 'CustomController', ['$scope',function( $scope ){
        $scope.visibleClasses = ["show-small","show-medium","show-large"];
        $scope.hiddenClasses = ["hide-small","hide-medium","hide-large"];
        $scope.sizes = [
            {name:'small',desc:'<600px'},
            {name:'medium',desc:'≥600px'},
            {name:'large',desc:'≥1100px'}
            ]
        $scope.selected = 'custom';
}]).config(function(optionsProvider) {
    var opts = {widths:[{name:"small",minWidth:0,maxWidth:599},
        {name:"medium",minWidth:600,maxWidth:1099},
        {name:"large",minWidth:1100,maxWidth:Infinity}]
    };
    optionsProvider.setOptions(opts);
}).config(["responderRuleFactoryProvider",function(provider){
        var classes = {classes:{
            "show-small": {visible:["small"]},
            "show-medium": {visible:["medium"]},
            "show-large": {visible:["large"]},
            "hide-small": {visible:["medium","large"]},
            "hide-medium": {visible:["small","large"]},
            "hide-large": {visible:["small","medium"]}
        }
        };
        provider.setResponderClasses(classes);
    }]);
