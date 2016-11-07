(function() {
    'use strict';

    angular
        .module('hispterstoreApp')
        .controller('BrandDeleteController',BrandDeleteController);

    BrandDeleteController.$inject = ['$uibModalInstance', 'entity', 'Brand'];

    function BrandDeleteController($uibModalInstance, entity, Brand) {
        var vm = this;

        vm.brand = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Brand.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
