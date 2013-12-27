angular.module('responsive.class',[]).directive('eeResponsiveClass',[function(){
    return {
        restrict: "AC",
        priority:50,
        compile: function compile(tElement, tAttrs, transclude) {
            var originalNGClassValue = null;
            if (tAttrs.ngClass !== undefined){
                originalNGClassValue = tAttrs.ngClass;

            }
            tAttrs.$set("ngClass","response");
            return {
                pre: function preLink(scope, iElement, iAttrs, controller) {
                    originalNGClassValue = scope.$eval(originalNGClassValue);
                    scope.eeResponsiveClassValue = true;
                    scope.response = {beep:scope.eeResponsiveClassValue};
                },
                post: function postLink(scope, iElement, iAttrs, controller) {  }
            };
        }
    };

    }]);