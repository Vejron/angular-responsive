angular.module('responsive.image',[]).directive('eeResponsiveImage',['imagePostLink',function(pl){
    return {
        restrict:'EA',
        link:pl,
        replace:true,
        template:'<img />'
    };
}]).factory('imagePostLink',[function(){
    var postLink = function(scope,iElement,iAttrs){
        scope.$watch(iAttrs.eeResponsiveImage, function (value,oldValue) {

            iElement.attr('src',value);


        });



    };

    return postLink;
}]);