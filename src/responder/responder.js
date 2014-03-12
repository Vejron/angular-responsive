angular.module( 'responsive.responder', ['responsive.listener','responsive.responder.rule'])
.factory('responderFactory',['widthEventListener','responderRuleFactory',function(eventListener,responderRuleFactory){
        var ResponderFactory = function(){};
        var Responder = function(){
            this.listener = null;
        };
        Responder.prototype.createListener = function(func){};
        Responder.prototype.registerTrigger = function(func){
            this.createListener(func);
            eventListener.subscribe(this.listener);
        };
        Responder.prototype.deregister = function(){
            eventListener.unSubscribe(this.listener);
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
        ResponderFactory.prototype.getBooleanResponder = function(classes){
            var rule = responderRuleFactory.getRule(classes);

            return new BooleanResponder(rule);
        };
        var StringResponder = function(ruleSets){
            this.ruleSets = ruleSets;
        };
        StringResponder.prototype = new Responder();
        StringResponder.prototype.createListener = function(func){
            var ruleSets = this.ruleSets;
            this.listener = function(width){
                for (var i = 0; i < ruleSets.length; i++) {
                    var ruleSet = ruleSets[i];
                    if(ruleSet.rule.widthValue(width.name)){
                        func(ruleSet.response);
                        return;
                    }
                }
                func(null);
            };
        };
        ResponderFactory.prototype.getStringResponder = function(ruleList){
            var ruleSets = [];
            for (var i = 0; i < ruleList.length; i++) {
                var ruleItem = ruleList[i];
                var rule = responderRuleFactory.getRule(ruleItem.classes);
                ruleSets.push({rule:rule,response:ruleItem.response});
            }

            return new StringResponder(ruleSets);
        };
        return new ResponderFactory();
}]);