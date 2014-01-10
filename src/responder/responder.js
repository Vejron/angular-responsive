angular.module( 'responsive.responder', ['responsive.listener','responsive.responder.rule'])
.factory('responderFactory',['widthEventListener','responderRuleFactory',function(listener,responderRuleFactory){
    var Responder = function(){
        this.listener = null;
    };
    Responder.prototype.createListener = function(func){};
    Responder.prototype.registerTrigger = function(func){
        this.createListener(func);
        listener.subscribe(this.listener);
    };
    Responder.prototype.deregister = function(){
        listener.unSubscribe(this.listener);
    };
    var BooleanResponder = function(rule){
        this.rule = rule;
    };
    BooleanResponder.prototype = new Responder();
    BooleanResponder.prototype.createListener = function(func){
        var rule = this.rule;
        this.listener = function(width){
            var response = rule.widthValue(width.name);
            func(response);
        };
    };
    var ResponderFactory = function(){};
    ResponderFactory.prototype.getBooleanResponder = function(classes){
        var rule = responderRuleFactory.getRule(classes);

        return new BooleanResponder(rule);
    };
    return new ResponderFactory();
}]);