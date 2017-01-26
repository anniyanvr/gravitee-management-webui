const ViewsComponent: ng.IComponentOptions = {
  bindings: {
    views: '<'
  },
  controller: 'ViewsController',
  template: require('./views.html')
};

export default ViewsComponent;
