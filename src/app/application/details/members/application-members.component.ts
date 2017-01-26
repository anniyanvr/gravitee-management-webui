const ApplicationMembersComponent: ng.IComponentOptions = {
  bindings: {
    application: '<',
    members: '<',
    groupMembers: '<'
  },
  controller: 'ApplicationMembersController',
  template: require('./application-members.html')
};

export default ApplicationMembersComponent;
