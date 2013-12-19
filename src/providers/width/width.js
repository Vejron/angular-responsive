angular.module( 'responsive.providers.width', []).
    constant('options',{widths:[{name:'xsmall',minWidth:0,maxWidth:767},
                 {name:'small',minWidth:768,maxWidth:991},
                 {name:'medium',minWidth:992,maxWidth:1199},
                 {name:'large',minWidth:1200, maxWidth:Infinity}]
    }).provider('widthFactory',['options',function(options){
        var opts = null;
        return {

            setOptions: function(val) {

                opts = val;
            },

            $get: function() {
                var WidthFactory = function(){
                    if (opts === null){
                        opts = options;
                    }

                };
                WidthFactory.prototype.getWidth = function(width){
                    for (var i = 0; i < opts.widths.length; i++) {
                        var widthDescriptor = opts.widths[i];
                        if (width >= widthDescriptor.minWidth &&
                            width <= widthDescriptor.maxWidth){
                            return widthDescriptor;
                        }
                    }
                    throw "Unsupported width";
                };
                return new WidthFactory();

            }

        };

}]);