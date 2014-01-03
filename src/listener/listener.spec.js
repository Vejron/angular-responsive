describe( 'Listener', function() {
	var mockWindow, mockSubscriber, listener;
	beforeEach(function(){
		mockSubscriber = jasmine.createSpy();
		module('responsive.listener',function($provide) {
			mockWindow = angular.element('<div>')[0];
			mockWindow.innerWidth = 9;

			mockWindow.fakeResize = function(){
				angular.element(this).triggerHandler("resize");
			};
            var MockWidth = function(){};
            var small = {};
            var big = {};
            MockWidth.prototype.getWidth = function(width){

                if (width<=10){
                    return small;
                }
                return big;
            };
			$provide.value('$window', mockWindow);
            $provide.value('widthFactory', new MockWidth());
		});
		
		inject(function(widthEventListener) {

			listener = widthEventListener;
		});
		listener.subscribe(mockSubscriber);
	});

	it('should get call on first subscribe',function(){
		expect(mockSubscriber).toHaveBeenCalled();
	});
	it('should not get called again on a second subscribe',function(){
		listener.subscribe(mockSubscriber);
		expect(mockSubscriber.callCount).toEqual(1);
	});
	it('should not call again if still same width class', function(){
		mockWindow.innerWidth = 10;
		mockWindow.fakeResize();
		expect(mockSubscriber.callCount).toEqual(1);
	});
    it('should get a call if width changes class', function(){
        mockWindow.innerWidth = 11;
        mockWindow.fakeResize();
        expect(mockSubscriber.callCount).toEqual(2);
    });
    it('should not get called again if unsubscribed.',function(){
        listener.unSubscribe(mockSubscriber);
        mockWindow.innerWidth = 11;
        mockWindow.fakeResize();
        expect(mockSubscriber.callCount).toEqual(1);
    });
});