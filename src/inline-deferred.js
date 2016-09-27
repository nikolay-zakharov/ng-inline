(function () {
    var module = angular.module('inlineDeferred', []);

    module.directive('ngInlineDeferred', ['$templateCache', function ($templateCache) {
        return {
            restrict: 'A',
            priority: 400, // Same as ng-include.
            compile: function (element, attrs) {
                var templateName = attrs.ngInlineDeferred;

                if ( ! templateName) {
                    throw new Error('ngInlineDeferred: expected template name');
                }

                var httpRequest = $templateCache.get(templateName);
                if (angular.isUndefined(httpRequest)) {
                    throw new Error('ngInlineDeferred: unknown template '+templateName);
                }

                httpRequest.then(function (response) {
                    element.html(response.data);
                });
            }
        };
    }
    ]);
})();
