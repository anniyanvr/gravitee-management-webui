const UserComponent: ng.IComponentOptions = {
  bindings: {
    user: '<'
  },
  controller: 'UserController',
  template: require('./user.html')
};

export default UserComponent;
