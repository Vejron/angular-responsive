angular.module( 'responsive.responder', ['responsive.listener','responsive.responder.rule'])
    .factory('responderFactory',['eeEventListener','responderRuleFactory',function(listener,responderRuleFactory){
    var Responder = function(rule){
        this.rule = rule;
    };
    Responder.prototype.registerTrigger = function(func){
        var rule = this.rule;
        this.listener = function(width){
            var response = rule[width.name].visible;
            func(response);
        };
        listener.subscribe(this.listener);
    };
    Responder.prototype.deregister = function(){
        listener.unSubscribe(this.listener);
    };
    var ResponderFactory = function(){};
    ResponderFactory.prototype.getBooleanResponder = function(classes){
        var rule = responderRuleFactory.getRule(classes);
        return new Responder(rule);
    };
    return new ResponderFactory();
}]);