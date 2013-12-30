angular.module( 'responsive.responder', ['responsive.listener','responsive.responder.rule'])
    .factory('responderFactory',['eeEventListener','responderRuleFactory',function(listener,responderRuleFactory){
    var Responder = function(rule){
        this.rule = rule;
    };
    Responder.prototype.registerTrigger = function(func){
        var rule = this.rule;
        this.listener = function(width){
            func(rule[width.name].visible);
        };
        listener.subscribe(this.listener);
    };
    Responder.prototype.deregister = function(){
        listener.unsubscribe(this.listener);
    };
    var ResponderFactory = function(){};
    ResponderFactory.prototype.getResponder = function(classes){
        var rule = responderRuleFactory.getRule(classes);
        return new Responder(rule);
    };
    return new ResponderFactory();
}]);