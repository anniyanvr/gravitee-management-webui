import ViewService from "../services/view.service";
import TenantService from "../services/tenant.service";
import TagService from "../services/tenant.service";
import SidenavService from '../components/sidenav/sidenav.service';

export default configurationConfig;

function configurationConfig($stateProvider: ng.ui.IStateProvider) {
  'ngInject';
  $stateProvider
    .state('configuration', {
      abstract: true,
      template: '<div ui-view></div>',
      url: '/configuration',
      parent: 'withSidenav'
    })
    .state('configuration.admin', {
      url: '/admin',
      controller: function ($state, SidenavService: SidenavService) {
        SidenavService.set('CONFIGURATION');
        if ('configuration.admin' === $state.current.name) {
          $state.go('configuration.admin.views');
        }
      },
      template: '<div ui-view></div>',
      data: {
        menu: {
          label: 'Configuration',
          icon: 'settings',
          firstLevel: true,
          order: 50
        },
        roles: ['ADMIN']
      }
    })
    .state('configuration.admin.views', {
      url: '/views',
      component: 'views',
      resolve: {
        views: (ViewService: ViewService) => ViewService.list().then(response => response.data)
      },
      data: {
        menu: {
          label: 'Views',
          icon: 'view_module'
        },
        roles: ['ADMIN']
      }
    })
    .state('configuration.admin.tags', {
      url: '/tags',
      component: 'tags',
      resolve: {
        tags: (TagService: TagService) => TagService.list().then(response => response.data)
      },
      data: {
        menu: {
          label: 'Sharding tags',
          icon: 'label'
        },
        roles: ['ADMIN']
      }
    })
    .state('configuration.admin.tenants', {
      url: '/tenants',
      component: 'tenants',
      resolve: {
        tenants: (TenantService: TenantService) => TenantService.list().then(response => response.data)
      },
      data: {
        menu: {
          label: 'Tenants',
          icon: 'shuffle'
        },
        roles: ['ADMIN']
      }
    })
    .state('configuration.admin.groups', {
      url: '/groups',
      templateUrl: 'app/configuration/admin/groups/groups.html',
      controller: 'GroupsController',
      controllerAs: 'groupsCtrl',
      data: {
        menu: {
          label: 'Groups',
          icon: 'group_work'
        },
        roles: ['ADMIN']
      }
    });
}
