angular.module( 'responsive.listener', ['responsive.width'])
    .service('widthEventListener', ['$window','widthFactory',function ($window,widthFactory){
    var lastWidth = widthFactory.getWidth($window.innerWidth);
    //todo only listen to events when one or more listeners are active.
    var listen = function(){
        var w = angular.element($window);
        w.on('resize', handler);
    };
    var subscribed = [];
    var hasSubscribed = function(func){
        return subscribed.indexOf(func) !== -1;
    };
    
    this.subscribe = function(func){
        if (!hasSubscribed(func)){
            subscribed.push(func);
            func(lastWidth);
        }
    };
    this.unSubscribe = function(func){
        if(hasSubscribed(func)){
            var index = subscribed.indexOf(func);
            subscribed.splice(index,1);
        }
    };
    var handler = function(event){
        var width = $window.innerWidth;
        handleResize(width);

    };
    var handleResize = function(newWidth){
        var width = widthFactory.getWidth(newWidth);
        if (width !== lastWidth){
            lastWidth = width;
            callSubscribed(lastWidth);
        }

    };
    var callSubscribed = function(value){
        for (var i = 0; i < subscribed.length; i++) {
            var subscriber = subscribed[i];
            subscriber(value);
        }
    };
    listen();
}]);