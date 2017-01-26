const InstancesComponent: ng.IComponentOptions = {
  bindings: {
    instances: '<'
  },
  controller: 'InstancesController',
  template: require('./instances.html')
};

export default InstancesComponent;
