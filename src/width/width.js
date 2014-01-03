angular.module( 'responsive.width', []).
constant('defaultOptions',{widths:[{name:'xsmall',minWidth:0,maxWidth:767},
             {name:'small',minWidth:768,maxWidth:991},
             {name:'medium',minWidth:992,maxWidth:1199},
             {name:'large',minWidth:1200, maxWidth:Infinity}]})
.factory('widthFactory',['widthOptions',function(options){
    var WidthFactory = function(){};
    WidthFactory.prototype.getWidth = function(width){
        for (var i = 0; i < options.widths.length; i++) {
            var widthDescriptor = options.widths[i];
            if (width >= widthDescriptor.minWidth &&
                width <= widthDescriptor.maxWidth){
                return widthDescriptor;
            }
        }
        throw "Unsupported width";
    };
    return new WidthFactory();

}]).provider('widthOptions',['defaultOptions',function(defaultOptions){
        var opts = null;
        return {
            setOptions: function(val) {

                opts = val;
            },
            $get: function() {
                if (opts){
                    return opts;
                }
                return defaultOptions;
            }

        };

    }]);