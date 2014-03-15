describe('src - ', function(){
    //No tests are copied to cover the code copied for ng-if I assume that it is covered, I know, I don't like it. /Emanuel 140102
    var $scope,$compile,elm,attrs,root,controller,postLink, mockRuleFactory;
    beforeEach(function(){
        mockRuleFactory = {};
        module('responsive.src');
        inject(function ($rootScope, _$compile_,srcPostLink) {
            $scope = $rootScope.$new();
            $compile = _$compile_;
            postLink = srcPostLink;
            root = $compile('<div></div>')($scope);
        });
        controller = {
            addClassesForSrc: function(src,classes){
                this.src = src;
                this.classes = classes;
            },
            removeSrc: function(src){
                this.removedSrc = src;
            }
        };
        elm = angular.element('<div></div>');
        attrs = {};
        spyOn(controller,'addClassesForSrc').andCallThrough();
        spyOn(controller,'removeSrc').andCallThrough();
    });
    describe('directive',function(){

        function createDirective() {
            root.append($compile('<ee-src responsive-src="abc" responsive-classes="small">Content</ee-src>')($scope));
            $scope.$apply();
        }
        it('should throw an error when initiated without a correct parent',function(){
           expect(createDirective).toThrow();
        });
    });
    describe('postLink',function(){
        function callLink(){
            postLink($scope,elm,attrs,controller);
        }

        it('should throw if responsive-src isn\'t added',function(){
            expect(callLink).toThrow();
        });
        it('should only call addclasses once on init',function(){
            attrs.responsiveSrc = "'src'";
            callLink();
            $scope.$digest();
            expect(controller.addClassesForSrc.callCount).toBe(1);
        });
        it('shouldn\'t call removesrc on init',function(){
            attrs.responsiveSrc = "'src'";
            callLink();
            $scope.$digest();
            expect(controller.removeSrc.callCount).toBe(0);
        });

        it('should return with classes set to null, when class not defined',function(){
            attrs.responsiveSrc = "'src'";
            callLink();
            $scope.$digest();
            expect(controller.src).toBe('src');
            expect(controller.classes).toBeNull();
        });

        it('should return a string when passed a variable',function(){
            $scope.srcStore = 'src';
            attrs.responsiveSrc = "srcStore";
            callLink();
            $scope.$digest();
            expect(controller.src).toBe('src');
        });
        it('classes is set when responsive-classes is defined',function(){
            attrs.responsiveSrc = "'src'";
            $scope.classes = "classValue";
            attrs.responsiveClasses = "classes";
            callLink();
            $scope.$digest();
            expect(controller.classes).toBe("classValue");
        });
        it('if responsive-src is redefined a call to remove src is made',function(){

            $scope.classes = "classValue";
            $scope.src = "srces";
            attrs.responsiveClasses = "classes";
            attrs.responsiveSrc = "src";
            callLink();
            $scope.$digest();
            $scope.src = "newSrcValue";
            $scope.$digest();
            expect(controller.removeSrc.callCount).toBe(1);
            expect(controller.removedSrc).toBe('srces');
        });
        it('if responsive-src is redefined a addClassesForSrc is called again',function(){

            $scope.classes = "classValue";
            $scope.src = "srces";
            attrs.responsiveClasses = "classes";
            attrs.responsiveSrc = "src";
            callLink();
            $scope.$digest();
            $scope.src = "newSrcValue";
            $scope.$digest();
            expect(controller.addClassesForSrc.callCount).toBe(2);
        });
        it('if responsive-src is redefined a src is set to correct value',function(){

            $scope.classes = "classValue";
            $scope.src = "srces";
            attrs.responsiveClasses = "classes";
            attrs.responsiveSrc = "src";
            callLink();
            $scope.$digest();
            $scope.src = "newSrcValue";
            $scope.$digest();
            expect(controller.src).toBe("newSrcValue");
        });
        it('if responsive-classes is redefined a addClassesForSrc is called again',function(){

            $scope.classes = "classValue";
            $scope.src = "srces";
            attrs.responsiveClasses = "classes";
            attrs.responsiveSrc = "src";
            callLink();
            $scope.$digest();
            $scope.classes = "newClassValue";
            $scope.$digest();
            expect(controller.addClassesForSrc.callCount).toBe(2);
        });
        it('if responsive-src is redefined a src is set to correct value',function(){

            $scope.classes = "classValue";
            $scope.src = "srces";
            attrs.responsiveClasses = "classes";
            attrs.responsiveSrc = "src";
            callLink();
            $scope.$digest();
            $scope.classes = "newClassValue";
            $scope.$digest();
            expect(controller.classes).toBe("newClassValue");
        });
    });



});
