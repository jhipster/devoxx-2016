(function() {
    'use strict';

    angular
        .module('hispterstoreApp')
        .controller('WishListDeleteController',WishListDeleteController);

    WishListDeleteController.$inject = ['$uibModalInstance', 'entity', 'WishList'];

    function WishListDeleteController($uibModalInstance, entity, WishList) {
        var vm = this;

        vm.wishList = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            WishList.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
