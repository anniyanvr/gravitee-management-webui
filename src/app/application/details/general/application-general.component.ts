const ApplicationGeneralComponent: ng.IComponentOptions = {
  bindings: {
    application: '<'
  },
  controller: 'ApplicationGeneralController',
  template: require('./application-general.html')
};

export default ApplicationGeneralComponent;
