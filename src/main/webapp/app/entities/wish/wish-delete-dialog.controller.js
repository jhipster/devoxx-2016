(function() {
    'use strict';

    angular
        .module('hispterstoreApp')
        .controller('WishDeleteController',WishDeleteController);

    WishDeleteController.$inject = ['$uibModalInstance', 'entity', 'Wish'];

    function WishDeleteController($uibModalInstance, entity, Wish) {
        var vm = this;

        vm.wish = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Wish.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
