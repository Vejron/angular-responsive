describe( 'ResponderRule', function() {
    var widthOptions,ruleFactory;
    beforeEach(function(){
        widthOptions = {widths:[{name:"small",minWidth:0,maxWidth:10},
                        {name:"medium",minWidth:11,maxWidth:20},
                        {name:"large",minWidth:21,maxWidth:Infinity}]
        };
        var classes = {classes:[
            {name:"vs", rule: {visible:["small"]}},
            {name:"vm", rule: {visible:["medium"]}},
            {name:"vl", rule: {visible:["large"]}},
            {name:"hs", rule: {visible:["medium","large"]}},
            {name:"hm", rule: {visible:["small","large"]}},
            {name:"hl", rule: {visible:["small","medium"]}}
            ]
        };
        angular.module('responsive.width').config(["widthOptionsProvider",function(widthOptionsProvider) {
            widthOptionsProvider.setOptions(widthOptions);
        }]);
        angular.module('responsive.responder.rule').config(["responderRuleFactoryProvider",function(provider){
            provider.setResponderClasses(classes);
        }]);
        module('responsive.responder.rule');
        inject(function(responderRuleFactory) {
            ruleFactory = responderRuleFactory;
        });

    });



	it('All should be false on empty string',function(){
        var rule = ruleFactory.getRule("");
        expect(rule.small.visible).toBeFalsy();
        expect(rule.medium.visible).toBeFalsy();
        expect(rule.large.visible).toBeFalsy();
	});
    it('Single class',function(){
        var rule = ruleFactory.getRule("vs");
        expect(rule.small.visible).toBeTruthy();
        expect(rule.medium.visible).toBeFalsy();
        expect(rule.large.visible).toBeFalsy();
    });
    it('Two classes',function(){
        var rule = ruleFactory.getRule("vs vm");
        expect(rule.small.visible).toBeTruthy();
        expect(rule.medium.visible).toBeTruthy();
        expect(rule.large.visible).toBeFalsy();
    });
    it('Bad class',function(){
        var exec = function(){
            var rule = ruleFactory.getRule("vsvm");
        };
        expect(exec).toThrow();
    });
    it('Classes that shouldn\'t be combined',function(){
        var rule = ruleFactory.getRule("vs hs");
        expect(rule.small.visible).toBeTruthy();
        expect(rule.medium.visible).toBeTruthy();
        expect(rule.large.visible).toBeTruthy();
    });
});