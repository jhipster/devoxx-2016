(function() {
    'use strict';

    angular
        .module('hispterstoreApp')
        .controller('SubCategoryDeleteController',SubCategoryDeleteController);

    SubCategoryDeleteController.$inject = ['$uibModalInstance', 'entity', 'SubCategory'];

    function SubCategoryDeleteController($uibModalInstance, entity, SubCategory) {
        var vm = this;

        vm.subCategory = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            SubCategory.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
