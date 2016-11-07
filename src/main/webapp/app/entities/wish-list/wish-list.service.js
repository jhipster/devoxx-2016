(function() {
    'use strict';
    angular
        .module('hispterstoreApp')
        .factory('WishList', WishList);

    WishList.$inject = ['$resource', 'DateUtils'];

    function WishList ($resource, DateUtils) {
        var resourceUrl =  'api/wish-lists/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.creationDate = DateUtils.convertLocalDateFromServer(data.creationDate);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.creationDate = DateUtils.convertLocalDateToServer(copy.creationDate);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.creationDate = DateUtils.convertLocalDateToServer(copy.creationDate);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
