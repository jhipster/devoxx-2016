(function() {
    'use strict';

    angular
        .module('hispterstoreApp')
        .controller('SubCategoryDetailController', SubCategoryDetailController);

    SubCategoryDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'SubCategory', 'Category', 'Product'];

    function SubCategoryDetailController($scope, $rootScope, $stateParams, previousState, entity, SubCategory, Category, Product) {
        var vm = this;

        vm.subCategory = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('hispterstoreApp:subCategoryUpdate', function(event, result) {
            vm.subCategory = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
