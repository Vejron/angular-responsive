angular.module( 'responsive.responder.rule', ['responsive.width'])
.constant('defaultResponderClasses',{classes:[
        {name:"visible-xs", rule: {visible:["xsmall"]}},
        {name:"visible-sm", rule: {visible:["small"]}},
        {name:"visible-md", rule: {visible:["medium"]}},
        {name:"visible-lg", rule: {visible:["large"]}},
        {name:"hidden-xs", rule: {visible:["small","medium","large"]}},
        {name:"hidden-sm", rule: {visible:["xsmall","medium","large"]}},
        {name:"hidden-md", rule: {visible:["xsmall","small","large"]}},
        {name:"hidden-lg", rule: {visible:["xsmall","small","medium"]}}
    ]})
.provider('responderRuleFactory',['defaultResponderClasses',function(defaultClasses){
    var responderClasses = null;
    return {
        setResponderClasses: function(val) {
            responderClasses = val;
        },
        $get: ['widthOptions',function(widthOptions) {
            if (responderClasses === null){
                responderClasses = defaultClasses;
            }

            var getActiveClassDescriptors = function(classes){
                classes = classes.split(" ");
                var active = [];
                if(classes.length == 1 && classes[0] === ""){
                    return active;
                }
                for (var i = 0; i < classes.length; i++) {
                    var item = getClassRules(classes[i]);
                    if (item === null){
                        throw "Class not supported.";
                    }
                    active.push(item);
                }
                return active;
            };
            var getClassRules = function(cssClass){
                var classes = responderClasses.classes;
                for (var i = 0; i < classes.length; i++) {
                    var responderClass = classes[i];
                    if (responderClass.name === cssClass){
                        return responderClass.rule;
                    }
                }
                return null;
            };
            var createDefaultRule = function(){
                var rule = {};
                var availableWidths = widthOptions.widths;
                for (var i = 0; i < availableWidths.length; i++) {
                    var width = availableWidths[i];
                    var name = width.name;
                    if (name === undefined){
                        throw "WidthOption lacks name";
                    }
                    rule[name] = {visible:false};
                }
                return rule;
            };
            var createRule = function(active){
                var rule = createDefaultRule();
                for (var i = 0; i < active.length; i++) {
                    var activeRule = active[i];
                    for (var j = 0; j < activeRule.visible.length; j++) {
                        var visible = activeRule.visible[j];
                        rule[visible].visible = true;
                    }
                }
                return rule;
            };
            var RuleFactory = function(){};
            RuleFactory.prototype.getRule = function(classes){
                var active = getActiveClassDescriptors(classes);
                var rule = createRule(active);
                return rule;
            };


            return new RuleFactory();
        }]

    };

}]);