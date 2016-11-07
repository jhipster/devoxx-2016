(function() {
    'use strict';

    angular
        .module('hispterstoreApp')
        .controller('ProductController', ProductController);

    ProductController.$inject = ['$scope', '$state', 'DataUtils', 'Product'];

    function ProductController ($scope, $state, DataUtils, Product) {
        var vm = this;
        
        vm.products = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll();

        function loadAll() {
            Product.query(function(result) {
                vm.products = result;
            });
        }
    }
})();
