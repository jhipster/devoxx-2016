(function() {
    'use strict';

    angular
        .module('hispterstoreApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('sub-category', {
            parent: 'entity',
            url: '/sub-category',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'hispterstoreApp.subCategory.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/sub-category/sub-categories.html',
                    controller: 'SubCategoryController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('subCategory');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('sub-category-detail', {
            parent: 'entity',
            url: '/sub-category/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'hispterstoreApp.subCategory.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/sub-category/sub-category-detail.html',
                    controller: 'SubCategoryDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('subCategory');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'SubCategory', function($stateParams, SubCategory) {
                    return SubCategory.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'sub-category',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('sub-category-detail.edit', {
            parent: 'sub-category-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/sub-category/sub-category-dialog.html',
                    controller: 'SubCategoryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['SubCategory', function(SubCategory) {
                            return SubCategory.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('sub-category.new', {
            parent: 'sub-category',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/sub-category/sub-category-dialog.html',
                    controller: 'SubCategoryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                alcohol: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('sub-category', null, { reload: 'sub-category' });
                }, function() {
                    $state.go('sub-category');
                });
            }]
        })
        .state('sub-category.edit', {
            parent: 'sub-category',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/sub-category/sub-category-dialog.html',
                    controller: 'SubCategoryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['SubCategory', function(SubCategory) {
                            return SubCategory.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('sub-category', null, { reload: 'sub-category' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('sub-category.delete', {
            parent: 'sub-category',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/sub-category/sub-category-delete-dialog.html',
                    controller: 'SubCategoryDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['SubCategory', function(SubCategory) {
                            return SubCategory.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('sub-category', null, { reload: 'sub-category' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
