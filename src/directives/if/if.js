angular.module('responsive.if',['responsive.responder']).directive('eeResponsiveIf',['responderFactory','$animate',function(responderFactory,$animate){
    return {
        restrict: "A",
        priority:601,
        terminal:true,
        transclude:'element',
        $$tlb:true,
        link: function ($scope, $element, $attr, ctrl, $transclude) {
            var responder = null;
            var ready = false;
            $scope.$watch($attr.eeResponsiveIf, function (value) {
                ready = false;
                if (responder != null){
                    responder.deregister();
                }
                if (value){

                    responder = responderFactory.getBooleanResponder(value);
                    responder.registerTrigger(responderFunction);
                }
                ready = true;
            });
            var responderFunction = function(value){
                ngIfWatchAction(value);
                if (ready){
                    $scope.$apply();
                }

            };
            //This function is lifted from ng-if, would like a better way to use this code than copy/paste.
            var block, childScope;
            function ngIfWatchAction(value) {

                if (toBoolean(value)) {
                    if (!childScope) {
                        childScope = $scope.$new();
                        $transclude(childScope, function (clone) {
                            clone[clone.length++] = document.createComment(' end ngIf: ' + $attr.ngIf + ' ');
                            // Note: We only need the first/last node of the cloned nodes.
                            // However, we need to keep the reference to the jqlite wrapper as it might be changed later
                            // by a directive with templateUrl when it's template arrives.
                            block = {
                                clone: clone
                            };
                            $animate.enter(clone, $element.parent(), $element);
                        });
                    }
                } else {

                    if (childScope) {
                        childScope.$destroy();
                        childScope = null;
                    }

                    if (block) {
                        $animate.leave(getBlockElements(block.clone));
                        block = null;
                    }
                }
            }
            function toBoolean(value) {
                if (value && value.length !== 0) {
                    var v = angular.lowercase("" + value);
                    value = !(v == 'f' || v == '0' || v == 'false' || v == 'no' || v == 'n' || v == '[]');
                } else {
                    value = false;
                }
                return value;
            }
            function getBlockElements(nodes) {
                var startNode = nodes[0],
                    endNode = nodes[nodes.length - 1];
                if (startNode === endNode) {
                    return jqLite(startNode);
                }

                var element = startNode;
                var elements = [element];

                do {
                    element = element.nextSibling;
                    if (!element) {break;}
                    elements.push(element);
                } while (element !== endNode);

                return angular.element(elements);
            }
            //

        }

    };

}]);