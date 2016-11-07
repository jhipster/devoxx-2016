(function() {
    'use strict';

    angular
        .module('hispterstoreApp')
        .controller('BrandController', BrandController);

    BrandController.$inject = ['$scope', '$state', 'Brand'];

    function BrandController ($scope, $state, Brand) {
        var vm = this;
        
        vm.brands = [];

        loadAll();

        function loadAll() {
            Brand.query(function(result) {
                vm.brands = result;
            });
        }
    }
})();
