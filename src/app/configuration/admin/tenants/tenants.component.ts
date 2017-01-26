const TenantsComponent: ng.IComponentOptions = {
  bindings: {
    tenants: '<'
  },
  controller: 'TenantsController',
  template: require('./tenants.html')
};

export default TenantsComponent;
