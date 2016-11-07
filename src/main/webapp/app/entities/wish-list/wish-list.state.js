(function() {
    'use strict';

    angular
        .module('hispterstoreApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('wish-list', {
            parent: 'entity',
            url: '/wish-list',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'hispterstoreApp.wishList.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/wish-list/wish-lists.html',
                    controller: 'WishListController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('wishList');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('wish-list-detail', {
            parent: 'entity',
            url: '/wish-list/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'hispterstoreApp.wishList.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/wish-list/wish-list-detail.html',
                    controller: 'WishListDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('wishList');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'WishList', function($stateParams, WishList) {
                    return WishList.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'wish-list',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('wish-list-detail.edit', {
            parent: 'wish-list-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/wish-list/wish-list-dialog.html',
                    controller: 'WishListDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['WishList', function(WishList) {
                            return WishList.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('wish-list.new', {
            parent: 'wish-list',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/wish-list/wish-list-dialog.html',
                    controller: 'WishListDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                creationDate: null,
                                hidden: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('wish-list', null, { reload: 'wish-list' });
                }, function() {
                    $state.go('wish-list');
                });
            }]
        })
        .state('wish-list.edit', {
            parent: 'wish-list',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/wish-list/wish-list-dialog.html',
                    controller: 'WishListDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['WishList', function(WishList) {
                            return WishList.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('wish-list', null, { reload: 'wish-list' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('wish-list.delete', {
            parent: 'wish-list',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/wish-list/wish-list-delete-dialog.html',
                    controller: 'WishListDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['WishList', function(WishList) {
                            return WishList.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('wish-list', null, { reload: 'wish-list' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
