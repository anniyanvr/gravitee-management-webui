const TagsComponent: ng.IComponentOptions = {
  bindings: {
    tags: '<'
  },
  controller: 'TagsController',
  template: require('./tags.html')
};

export default TagsComponent;
