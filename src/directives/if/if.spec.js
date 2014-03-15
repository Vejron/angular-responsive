describe('if', function(){
    //No tests are copied to cover the code copied for ng-if I assume that it is covered, I know, I don't like it. /Emanuel 140102
    var $scope,$compile,mockFactory, mockResponder,root;
    beforeEach(function(){

        mockResponder = {};
        mockResponder.deregister = function(){

        };
        mockResponder.registerTrigger = function(trigger){
            mockResponder.trigger = trigger;
        };
        mockResponder.triggerFalse = function(){
            mockResponder.trigger(false);
        };
        mockResponder.triggerTrue = function(){
            mockResponder.trigger(true);
        };
        spyOn(mockResponder,'deregister');
        mockFactory = {};
        mockFactory.getBooleanResponder = function(){
            return mockResponder;
        };
        module('responsive.if',function($provide) {
            $provide.value('responderFactory', mockFactory);
        });
        inject(function ($rootScope, _$compile_) {
            $scope = $rootScope.$new();
            $compile = _$compile_;
            root = $compile('<div></div>')($scope);
        });
        $scope.fake = "'fake'";
    });
    function createDirective() {
        root.append($compile('<div ee-responsive-if="fake"><div>Content</div></div>')($scope));
        $scope.$apply();
    }
    it('should not be included if false is sent',function(){
        createDirective();
        mockResponder.triggerFalse();
        expect(root.children().length).toBe(0);
    });
    it('should be included if true is sent',function(){
        createDirective();
        mockResponder.triggerTrue();
        expect(root.children().length).toBe(1);
    });
    it('should be removed if changes from true to false',function(){
        createDirective();
        mockResponder.triggerTrue();
        mockResponder.triggerFalse();
        expect(root.children().length).toBe(0);
    });
    it('should call deregister if rule has changed',function(){
        createDirective();
        mockResponder.triggerTrue();
        $scope.fake = "'fake2";
        $scope.$apply();
        expect(mockResponder.deregister).toHaveBeenCalled();
    });
    it('should deregister on scope destruction', function(){
        createDirective();
        $scope.$destroy();
        expect(mockResponder.deregister).toHaveBeenCalled();
    });
});
