(function(angular) {'use strict';
    function __error(message, json) {
        throw new Error('Incorrect json, ' + message + ': ' + JSON.stringify(json));
    }

    function __directives(module) {
        var directives = [];
        var invokes = angular.module(module)._invokeQueue;
        for (var i in invokes) {
            if (invokes[i][1] === "directive") directives.push(invokes[i][2][0]);
        }
        return directives;
    }

    function node(json) {
        if (!json.view) {
            if (json.rows) { // grid
                var html = '<div class="container' + (json.fluid ? '-fluid' : '') + '">';
                for (var i = 0; i < json.rows.length; i++) {
                    html += '<div class="row">' + toolkitEval(json.rows[i]) + '</div>';
                }
                html += '</div>';
                return html;
            }
            if (json._) {
                return json._;
            }
            __error('\"view\" attribute required', json);
        }

        switch (json.view) { // columns
            case 'col-1': return '<div class="col-md-1">' + (json._ ? toolkitEval(json._) : '') + '</div>';
            case 'col-2': return '<div class="col-md-2">' + (json._ ? toolkitEval(json._) : '') + '</div>';
            case 'col-3': return '<div class="col-md-3">' + (json._ ? toolkitEval(json._) : '') + '</div>';
            case 'col-4': return '<div class="col-md-4">' + (json._ ? toolkitEval(json._) : '') + '</div>';
            case 'col-5': return '<div class="col-md-5">' + (json._ ? toolkitEval(json._) : '') + '</div>';
            case 'col-6': return '<div class="col-md-6">' + (json._ ? toolkitEval(json._) : '') + '</div>';
            case 'col-7': return '<div class="col-md-7">' + (json._ ? toolkitEval(json._) : '') + '</div>';
            case 'col-8': return '<div class="col-md-8">' + (json._ ? toolkitEval(json._) : '') + '</div>';
            case 'col-9': return '<div class="col-md-9">' + (json._ ? toolkitEval(json._) : '') + '</div>';
            case 'col-10': return '<div class="col-md-10">' + (json._ ? toolkitEval(json._) : '') + '</div>';
            case 'col-11': return '<div class="col-md-11">' + (json._ ? toolkitEval(json._) : '') + '</div>';
            case 'col-12': return '<div class="col-md-12">' + (json._ ? toolkitEval(json._) : '') + '</div>';

            case 'header': // header/footer
                if (!json.title) {
                    __error('\"title\" attribute required', json);
                }

                return '<nav class="navbar navbar-inverse navbar-fixed-top"><div class="container' +
                        (json.fluid ? '-fluid' : '') + '"><div class="navbar-header">' +
                        '<a class="navbar-brand" href="#">' + json.title + '</a></div></div></nav>';
            case 'footer': return '<footer class="footer"><div class="container' + (json.fluid ? '-fluid' : '') + '">' +
                '<p class="text-muted">' + (json._ ? toolkitEval(json._) : '') + '</p></div></footer>';

            case 'trace': return '<pre>' + JSON.stringify(__directives('angularjs.toolkit.directives')) + '</pre>';

            case 'html': return json._;

            default: break;
        }
        __error('this view is not registered', json);
    }

    function toolkitEval(json) {
        if (!json) {
            __error('should not be null or undefined', json);
        }

        if (Array.isArray(json)) {
            var html = '';
            for (var i = 0; i < json.length; i++) {
                html += node(json[i]);
            }
            return html;
        }

        return node(json);
    }

    angular
        .module('angularjs.toolkit', ['angularjs.toolkit.directives'], function($compileProvider) {
            $compileProvider.directive('kitCompile', function($compile) {
                return function(scope, element, attrs) {
                    scope.$watch(
                        function(scope) {
                            return scope.$eval(attrs.kitCompile);
                        },
                        function(value) {
                            element.html(toolkitEval(value));
                            $compile(element.contents())(scope);
                        }
                    );
                };
            });
        });
})(angular);