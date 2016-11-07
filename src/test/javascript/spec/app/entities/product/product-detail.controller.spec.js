'use strict';

describe('Controller Tests', function() {

    describe('Product Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockProduct, MockSubCategory, MockBrand;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockProduct = jasmine.createSpy('MockProduct');
            MockSubCategory = jasmine.createSpy('MockSubCategory');
            MockBrand = jasmine.createSpy('MockBrand');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Product': MockProduct,
                'SubCategory': MockSubCategory,
                'Brand': MockBrand
            };
            createController = function() {
                $injector.get('$controller')("ProductDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'hispterstoreApp:productUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
