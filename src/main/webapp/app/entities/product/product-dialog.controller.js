(function() {
    'use strict';

    angular
        .module('hispterstoreApp')
        .controller('ProductDialogController', ProductDialogController);

    ProductDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'Product', 'SubCategory', 'Brand'];

    function ProductDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, Product, SubCategory, Brand) {
        var vm = this;

        vm.product = entity;
        vm.clear = clear;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;
        vm.subcategories = SubCategory.query();
        vm.brands = Brand.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.product.id !== null) {
                Product.update(vm.product, onSaveSuccess, onSaveError);
            } else {
                Product.save(vm.product, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('hispterstoreApp:productUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


        vm.setImage = function ($file, product) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        product.image = base64Data;
                        product.imageContentType = $file.type;
                    });
                });
            }
        };

    }
})();
