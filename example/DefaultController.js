angular.module( 'default', ['example'])


.controller( 'DefaultController', ['$scope',function( $scope ){
        $scope.visibleClasses = ["visible-xs","visible-sm","visible-md","visible-lg"];
        $scope.hiddenClasses = ["hidden-xs","hidden-sm","hidden-md","hidden-lg"];
        $scope.sizes = [
            {name:'xsmall',desc:'<768px'},
            {name:'small',desc:'≥768px'},
            {name:'medium',desc:'≥992px'},
            {name:'large',desc:'≥1200px'}
            ]
        $scope.selected = 'default';
}]);