const ApplicationsComponent: ng.IComponentOptions = {
  bindings: {
    applications: '<'
  },
  controller: 'ApplicationsController',
  template: require('./applications.html')
};

export default ApplicationsComponent;
