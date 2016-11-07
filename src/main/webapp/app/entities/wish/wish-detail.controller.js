(function() {
    'use strict';

    angular
        .module('hispterstoreApp')
        .controller('WishDetailController', WishDetailController);

    WishDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Wish', 'WishList'];

    function WishDetailController($scope, $rootScope, $stateParams, previousState, entity, Wish, WishList) {
        var vm = this;

        vm.wish = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('hispterstoreApp:wishUpdate', function(event, result) {
            vm.wish = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
