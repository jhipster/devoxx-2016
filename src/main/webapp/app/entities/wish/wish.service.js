(function() {
    'use strict';
    angular
        .module('hispterstoreApp')
        .factory('Wish', Wish);

    Wish.$inject = ['$resource'];

    function Wish ($resource) {
        var resourceUrl =  'api/wishes/:id';

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
