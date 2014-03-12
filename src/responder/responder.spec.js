describe( 'Responders -',function(){
    var responder,mockListener,MockResponderRuleFactory;
    beforeEach(function(){
        mockListener = {};
        mockListener.subscribe = function(subscriber){mockListener.subscriber = subscriber;};
        mockListener.unSubscribe = function(subscriber){};

        spyOn(mockListener,'subscribe').andCallThrough();

        spyOn(mockListener,'unSubscribe').andCallThrough();
    });
    var doProvide = function(){
        module('responsive.responder',function($provide) {

            $provide.value('widthEventListener', mockListener);
            $provide.value('responderRuleFactory', MockResponderRuleFactory);
        });
    } ;
    describe( 'Boolean Responder', function() {

        beforeEach(function(){
            MockResponderRuleFactory = {};
            MockResponderRuleFactory.getRule = function(){
                var rule = {};
                rule.widthValue = function(name){
                    if (name === "small"){
                        return false;
                    }
                    return true;
                };
                return rule;
            };
            doProvide();

            inject(function(responderFactory) {
                responder = responderFactory.getBooleanResponder(""); //actual rule values are created above in the MockResponderRuleFactory
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
    describe('String Responder - ',function(){
        var firstResponse,secondResponse;
        beforeEach(function(){
            MockResponderRuleFactory = {};
            MockResponderRuleFactory.getRule = function(classes){
                var rule = {};
                rule.match = classes;
                rule.widthValue = function(name){
                    if (this.match === name){
                        return true;
                    }
                    return false;
                };
                return rule;
            };
            doProvide();
            firstResponse = 'firstResponse';
            secondResponse = 'secondResponse';

        });
        describe('simple',function(){
            beforeEach(function(){
                inject(function(responderFactory) {
                    responder = responderFactory.getStringResponder([{classes:'small',response:firstResponse},{classes:'big',response:secondResponse}]);
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
            it ('should get correct response on small', function(){
                var trigger = jasmine.createSpy('trigger');
                responder.registerTrigger(trigger);
                mockListener.subscriber({name:"small"});
                expect(trigger).toHaveBeenCalledWith(firstResponse);

            });
            it ('should get correct response on big', function(){
                var trigger = jasmine.createSpy('trigger');
                responder.registerTrigger(trigger);
                mockListener.subscriber({name:"big"});
                expect(trigger).toHaveBeenCalledWith(secondResponse);

            });
        });
        describe('not covering all classes',function(){
            beforeEach(function(){
                inject(function(responderFactory) {
                    responder = responderFactory.getStringResponder([{classes:'small',response:firstResponse}]);
                });
            });
            it ('should get correct response on small', function(){
                var trigger = jasmine.createSpy('trigger');
                responder.registerTrigger(trigger);
                mockListener.subscriber({name:"small"});
                expect(trigger).toHaveBeenCalledWith(firstResponse);

            });
            it ('should get null on big', function(){
                var trigger = jasmine.createSpy('trigger');
                responder.registerTrigger(trigger);
                mockListener.subscriber({name:"big"});
                expect(trigger).toHaveBeenCalledWith(null);

            });
        });
        describe('rules sharing classes',function(){
            beforeEach(function(){
                inject(function(responderFactory) {
                    responder = responderFactory.getStringResponder([{classes:'small',response:firstResponse},{classes:'small',response:secondResponse}]);
                });
            });
            it ('should get first in list on small and only one call', function(){
                var trigger = jasmine.createSpy('trigger');
                responder.registerTrigger(trigger);
                mockListener.subscriber({name:"small"});
                expect(trigger).toHaveBeenCalledWith(firstResponse);
                expect(trigger.callCount).toBe(1);
            });
        });

    });

});
