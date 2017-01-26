import ApplicationService from "../services/applications.service";
import GroupService from "../services/group.service";

export default applicationsConfig;

function applicationsConfig($stateProvider: ng.ui.IStateProvider) {
  'ngInject';
  $stateProvider
    .state('applications', {
      abstract: true,
      url: '/applications',
      template: '<div ui-view></div>',
      parent: 'withSidenav'
    })
    .state('applications.list', {
      url: '/',
      component: 'applications',
      data: {
        menu: {
          label: 'Applications',
          icon: 'list',
          firstLevel: true,
          order: 20
        },
        devMode: true
      },
      resolve: {
        applications: (ApplicationService: ApplicationService) => ApplicationService.list().then(response => response.data)
      },
    })
    .state('applications.portal', {
      abstract: true,
      url: '/:applicationId',
      component: 'application',
      resolve: {
        application: ($stateParams: ng.ui.IStateParamsService, ApplicationService: ApplicationService) =>
          ApplicationService.get($stateParams['applicationId']).then(response => response.data)
      }
    })
    .state('applications.portal.general', {
      url: '/',
      component: 'applicationGeneral',
      data: {
        menu: {
          label: 'Global settings',
          icon: 'blur_on'
        },
        devMode: true
      },
      resolve: {
        application: ($stateParams: ng.ui.IStateParamsService, ApplicationService: ApplicationService) =>
          ApplicationService.get($stateParams['applicationId']).then(response => response.data)
      }
    })
    .state('applications.portal.subscriptions', {
      url: '/subscriptions',
      component: 'applicationSubscriptions',
      resolve: {
        subscriptions: ($stateParams: ng.ui.IStateParamsService, ApplicationService: ApplicationService) =>
          ApplicationService.listSubscriptions($stateParams['applicationId']).then(response => response.data)
      },
      data: {
        menu: {
          label: 'Subscriptions',
          icon: 'vpn_key'
        },
        devMode: true
      }
    })
    .state('applications.portal.members', {
      url: '/members',
      component: 'applicationMembers',
      resolve: {
        members: ($stateParams: ng.ui.IStateParamsService, ApplicationService: ApplicationService) =>
          ApplicationService.getMembers($stateParams['applicationId']).then(response => response.data),
        groupMembers: ($stateParams: ng.ui.IStateParamsService, application: any, GroupService: GroupService) =>
          (application.group && application.group.id &&
          GroupService.getMembers(application.group.id).then(response => response.data))
      },
      data: {
        menu: {
          label: 'Members',
          icon: 'group'
        },
        devMode: true
      }
    })
    .state('applications.portal.analytics', {
      url: '/analytics?from&to',
      component: 'applicationAnalytics',
      data: {
        menu: {
          label: 'Analytics',
          icon: 'insert_chart'
        },
        devMode: true
      },
      params: {
        from: {
          type: "int",
          dynamic: true
        },
        to: {
          type: "int",
          dynamic: true
        }
      }
    })
}
