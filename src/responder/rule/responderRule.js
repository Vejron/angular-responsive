angular.module( 'responsive.responder.rule', ['responsive.width'])
.constant('defaultResponderClasses',{classes:{
        "visible-xs": {visible:["xsmall"]},
        "visible-sm": {visible:["small"]},
        "visible-md": {visible:["medium"]},
        "visible-lg": {visible:["large"]},
        "hidden-xs": {visible:["small","medium","large"]},
        "hidden-sm": {visible:["xsmall","medium","large"]},
        "hidden-md": {visible:["xsmall","small","large"]},
        "hidden-lg": {visible:["xsmall","small","medium"]}
    }})
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
                    var cssClass = classes[i];
                    var item = responderClasses.classes[cssClass];
                    if (item === undefined){
                        //todo test this.
                        throw "Class not supported.";
                    }
                    active.push(item);
                }
                return active;
            };
            var createDefaultRule = function(){
                var rule = {};
                var availableWidths = widthOptions.widths;
                for (var i = 0; i < availableWidths.length; i++) {
                    var width = availableWidths[i];
                    var name = width.name;
                    if (name === undefined){
                        //todo:test this.
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