(function() {
    'use strict';

    angular
        .module('hispterstoreApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('wish', {
            parent: 'entity',
            url: '/wish?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'hispterstoreApp.wish.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/wish/wishes.html',
                    controller: 'WishController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search
                    };
                }],
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('wish');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('wish-detail', {
            parent: 'entity',
            url: '/wish/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'hispterstoreApp.wish.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/wish/wish-detail.html',
                    controller: 'WishDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('wish');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Wish', function($stateParams, Wish) {
                    return Wish.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'wish',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('wish-detail.edit', {
            parent: 'wish-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/wish/wish-dialog.html',
                    controller: 'WishDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Wish', function(Wish) {
                            return Wish.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('wish.new', {
            parent: 'wish',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/wish/wish-dialog.html',
                    controller: 'WishDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                productId: null,
                                price: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('wish', null, { reload: 'wish' });
                }, function() {
                    $state.go('wish');
                });
            }]
        })
        .state('wish.edit', {
            parent: 'wish',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/wish/wish-dialog.html',
                    controller: 'WishDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Wish', function(Wish) {
                            return Wish.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('wish', null, { reload: 'wish' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('wish.delete', {
            parent: 'wish',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/wish/wish-delete-dialog.html',
                    controller: 'WishDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Wish', function(Wish) {
                            return Wish.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('wish', null, { reload: 'wish' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
