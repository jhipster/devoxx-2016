(function() {
    'use strict';

    angular
        .module('hispterstoreApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('category', {
            parent: 'entity',
            url: '/category',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'hispterstoreApp.category.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/category/categories.html',
                    controller: 'CategoryController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('category');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('category-detail', {
            parent: 'entity',
            url: '/category/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'hispterstoreApp.category.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/category/category-detail.html',
                    controller: 'CategoryDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('category');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Category', function($stateParams, Category) {
                    return Category.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'category',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('category-detail.edit', {
            parent: 'category-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/category/category-dialog.html',
                    controller: 'CategoryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Category', function(Category) {
                            return Category.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('category.new', {
            parent: 'category',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/category/category-dialog.html',
                    controller: 'CategoryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('category', null, { reload: 'category' });
                }, function() {
                    $state.go('category');
                });
            }]
        })
        .state('category.edit', {
            parent: 'category',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/category/category-dialog.html',
                    controller: 'CategoryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Category', function(Category) {
                            return Category.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('category', null, { reload: 'category' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('category.delete', {
            parent: 'category',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/category/category-delete-dialog.html',
                    controller: 'CategoryDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Category', function(Category) {
                            return Category.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('category', null, { reload: 'category' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
