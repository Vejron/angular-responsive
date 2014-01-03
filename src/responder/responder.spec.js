describe( 'Boolean Responder', function() {
	var responder,mockListener,MockResponderRuleFactory;
    beforeEach(function(){
        mockListener = {};
        mockListener.subscribe = function(subscriber){mockListener.subscriber = subscriber;};
        mockListener.unSubscribe = function(subscriber){};

        spyOn(mockListener,'subscribe').andCallThrough();

        spyOn(mockListener,'unSubscribe').andCallThrough();

        MockResponderRuleFactory = {};
        MockResponderRuleFactory.getRule = function(){
            return {
                "small":{visible:false},
                "big":{visible:true}
            };
        };
        module('responsive.responder',function($provide) {

            $provide.value('eeEventListener', mockListener);
            $provide.value('responderRuleFactory', MockResponderRuleFactory);
        });

        inject(function(responderFactory) {
            responder = responderFactory.getBooleanResponder("");
        });

    });

	it ('Shouldn\'t have subscribed on init',function(){
		expect(mockListener.subscribe).not.toHaveBeenCalled();
	});

	it ('should register for listener when a trigger function is set', function(){
        var test = function(){};
        responder.registerTrigger(test);
        expect(mockListener.subscribe).toHaveBeenCalled();
	});
    it ('should get false on small', function(){
        var trigger = jasmine.createSpy('trigger');
        responder.registerTrigger(trigger);
        mockListener.subscriber({name:"small"});
        expect(trigger).toHaveBeenCalledWith(false);

    });
    it ('should get true on big', function(){
        var trigger = jasmine.createSpy('trigger');
        responder.registerTrigger(trigger);
        mockListener.subscriber({name:"big"});
        expect(trigger).toHaveBeenCalledWith(true);

    });
});