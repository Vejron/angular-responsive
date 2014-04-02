describe('image',function(){
    var $scope,root,$compile,elm;
    beforeEach(function(){
        module('responsive.image',function($provide) {

        });
        inject(function ($rootScope, _$compile_) {
            $scope = $rootScope.$new();
            $compile = _$compile_;
            root = $compile('<div></div>')($scope);
        });

    });
    describe('on img',function(){
        beforeEach(function(){
            $scope.src = 'test.png';
        });
        function createDirective(){
            root.append($compile('<img ee-responsive-image="src"/>')($scope));
            $scope.$apply();
            elm = angular.element(root.children()[0]);
        }
        it('should have an image with correct src',function(){
            createDirective();
            expect(elm.prop('tagName')).toBe('IMG');
            expect(elm.attr('src')).toBe('test.png');
        });
        it('src should update',function(){
            createDirective();
            $scope.src="test2.png";
            $scope.$digest();
            expect(elm.attr('src')).toBe('test2.png');
        });
    });
});
