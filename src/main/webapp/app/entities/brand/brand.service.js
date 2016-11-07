(function() {
    'use strict';
    angular
        .module('hispterstoreApp')
        .factory('Brand', Brand);

    Brand.$inject = ['$resource'];

    function Brand ($resource) {
        var resourceUrl =  'api/brands/:id';

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
