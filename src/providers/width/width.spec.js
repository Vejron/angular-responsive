describe( 'Width', function() {
    var opts, width;
    beforeEach(function(){
        opts = {widths:[{minWidth:0,maxWidth:1},
            {minWidth:2,maxWidth:2}]
        };

        angular.module('responsive.providers.width').config(function(optionsProvider) {
            optionsProvider.setOptions(opts);
        });
        module('responsive.providers.width');
        inject(function(widthFactory) {
            width = widthFactory;
        });
    });

    it('expect correct object to be returned',function(){
        var obj = width.getWidth(1);
        expect(obj).toEqual(opts.widths[0]);
    });

    it('expect a different object to be returned with other size',function(){
        var obj = width.getWidth(2);
        expect(obj).toEqual(opts.widths[1]);
    });
    it('expect an error to be thrown if outside bounds',function(){
        var exec = function(){
            width.getWidth(3);
        };
        expect(exec).toThrow();
    });
});