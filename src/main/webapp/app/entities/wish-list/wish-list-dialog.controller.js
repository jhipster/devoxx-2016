(function() {
    'use strict';

    angular
        .module('hispterstoreApp')
        .controller('WishListDialogController', WishListDialogController);

    WishListDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'WishList', 'User'];

    function WishListDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, WishList, User) {
        var vm = this;

        vm.wishList = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.users = User.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.wishList.id !== null) {
                WishList.update(vm.wishList, onSaveSuccess, onSaveError);
            } else {
                WishList.save(vm.wishList, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('hispterstoreApp:wishListUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.creationDate = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
