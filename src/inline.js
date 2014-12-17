(function(){
  var module = angular.module('inline', []);

  module.directive('ngInline', [
    '$templateCache',
    function($templateCache) {
      return {
        restrict: 'A',
        priority: 400, // Same as ng-include.
        compile: function(element, attrs){
          var templateName = attrs.ngInline;
          if(!templateName){
            throw new Error('ngInline: expected template name');
          }
          if(!$templateCache.has(templateName)){
            throw new Error('ngInline: unknown template ' + templateName);
          }
          var template = $templateCache.get(templateName);
          element.html(template);
        }
      };
    }
  ]);
})();
