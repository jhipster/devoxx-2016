(function() {
    'use strict';
    angular
        .module('hispterstoreApp')
        .factory('SubCategory', SubCategory);

    SubCategory.$inject = ['$resource'];

    function SubCategory ($resource) {
        var resourceUrl =  'api/sub-categories/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
