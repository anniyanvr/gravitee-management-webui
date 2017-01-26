import ViewService from "../services/view.service";
import ApisController from "./apis.controller";

export default apisConfig;

function apisConfig($stateProvider: ng.ui.IStateProvider) {
  'ngInject';
  $stateProvider.state('apis.new', {
      url: "/new",
      template: require('./admin/creation/newApi.html'),
      controller: 'NewApiController',
      controllerAs: 'newApiCtrl',
      params: {
        api: null
      }
    })
    .state('apis.create', {
      url: '/new/create',
      template: require('./admin/creation/steps/steps.html'),
      controller: 'NewApiController',
      controllerAs: 'newApiCtrl',
      params: {
        api: null
      }
    })
    .state('apis.list', {
      url: '/?view',
      template: require('./apis.html'),
      controller: ApisController,
      controllerAs: '$ctrl',
      resolve: {
        resolvedApis: function ($stateParams, ApiService) {
          if ($stateParams.view && $stateParams.view !== 'all') {
            return ApiService.list($stateParams.view);
          }
          return ApiService.list();
        },
        resolvedViews: (ViewService: ViewService) => {
          return ViewService.list().then(response => {
            let views = response.data;
            views.unshift({id: 'all', name: 'All APIs'});
            return views;
          });
        }
      },
      data: {
        menu: {
          label: 'APIs',
          icon: 'dashboard',
          firstLevel: true,
          order: 10
        },
        devMode: true
      },
      params: {
        view: {
          type: 'string',
          value: 'all',
          squash: true
        }
      }
    });
}
