(function() {
    'use strict';

    angular
        .module('hispterstoreApp')
        .controller('SubCategoryDialogController', SubCategoryDialogController);

    SubCategoryDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'SubCategory', 'Category', 'Product'];

    function SubCategoryDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, SubCategory, Category, Product) {
        var vm = this;

        vm.subCategory = entity;
        vm.clear = clear;
        vm.save = save;
        vm.categories = Category.query();
        vm.products = Product.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.subCategory.id !== null) {
                SubCategory.update(vm.subCategory, onSaveSuccess, onSaveError);
            } else {
                SubCategory.save(vm.subCategory, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('hispterstoreApp:subCategoryUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
