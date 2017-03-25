(function(angular) {'use strict';
    angular
        .module('angularjs.toolkit.directives', [])
        .directive('kTest', function() {
            return {
                restrict: 'E',
                template: '123'
            }
        });
    //.directive('kTest', function() {
    //    return {
    //        restrict: 'E',
    //        replace: true,
    //        transclude: true,
    //        template: '<footer class="footer"><div class="container"><p class="text-muted" ng-transclude></p></div></footer>',
    //    }
    //});
})(angular);