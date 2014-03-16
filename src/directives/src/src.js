angular.module('responsive.src', ['responsive.responder.rule']).directive('eeSrc',['srcPostLink',function(postLink){
    return {
        restrict: "E",
        require:'?^ee-responsive-image',
        link:postLink
    };


}]).factory('srcPostLink',[function(){
        var postLink = function(scope,iElement,iAttrs,controller){
            if (!controller){
                throw 'No controller, ee-src must be have a parent directive, \'ee-responsive-include\'';
            }
            if (!iAttrs.responsiveSrc){
                throw 'Must have a responsive-src attribute';
            }
            var src = null;
            var classes = null;
            scope.$watch(iAttrs.responsiveSrc, function (value,oldValue) {
                if(value !== oldValue){
                    src = value;
                    controller.removeSrc(oldValue);
                    controller.addClassesForSrc(src, classes);
                }

            });
            src = scope.$eval(iAttrs.responsiveSrc);
            if (iAttrs.responsiveClasses){
                classes = scope.$eval(iAttrs.responsiveClasses);
                scope.$watch(iAttrs.responsiveClasses, function (value,oldValue) {
                    if(value !== oldValue){
                        classes = value;
                        controller.addClassesForSrc(src, classes);
                    }

                });
            }
            controller.addClassesForSrc(src, classes);
        };
        return postLink;
}]);
