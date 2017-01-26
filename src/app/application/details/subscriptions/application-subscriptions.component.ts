const ApplicationSubscriptionsComponent: ng.IComponentOptions = {
  bindings: {
    application: '<',
    subscriptions: '<'
  },
  controller: 'ApplicationSubscriptionsController',
  template: require('./application-subscriptions.html')
};

export default ApplicationSubscriptionsComponent;
