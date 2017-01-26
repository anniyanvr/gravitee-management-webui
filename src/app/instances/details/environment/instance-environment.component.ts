const InstanceEnvironmentComponent: ng.IComponentOptions = {
  bindings: {
    instance: '<'
  },
  controller: 'InstanceEnvironmentController',
  template: require('./instance-environment.html')
};

export default InstanceEnvironmentComponent;
