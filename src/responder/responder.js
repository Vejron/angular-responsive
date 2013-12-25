angular.module( 'responsive.responder', ['responsive.listener','responsive.responder.rule'])
    .factory('responderFactory',['eeEventListener','responderRuleFactory',function(listener,responderRuleFactory){
    var Responder = function(rule){
        this.rule = rule;
    };
    Responder.prototype.listener = function(width){
        this.triggerFunction(this.rule[width.name].visible);
    };
    Responder.prototype.registerTrigger = function(func){
        this.triggerFunction = func;
        listener.subscribe(this.listener);
    };
    Responder.prototype.deregister = function(){
        this.triggerFunction = null;
        listener.unsubscribe(this.listener);
    };
    var ResponderFactory = function(){};
    ResponderFactory.prototype.getResponder = function(classes){
        var rule = responderRuleFactory.getRule(classes);
        return new Responder(rule);
    };
    return new ResponderFactory();
}]);