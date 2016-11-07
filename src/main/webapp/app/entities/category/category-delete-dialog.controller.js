(function() {
    'use strict';

    angular
        .module('hispterstoreApp')
        .controller('CategoryDeleteController',CategoryDeleteController);

    CategoryDeleteController.$inject = ['$uibModalInstance', 'entity', 'Category'];

    function CategoryDeleteController($uibModalInstance, entity, Category) {
        var vm = this;

        vm.category = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Category.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
