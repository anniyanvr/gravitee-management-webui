const ApplicationAnalyticsComponent: ng.IComponentOptions = {
  bindings: {
    application: '<'
  },
  controller: 'ApplicationAnalyticsController',
  template: require('./application-analytics.html')
};

export default ApplicationAnalyticsComponent;
