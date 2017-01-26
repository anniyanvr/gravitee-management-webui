import SidenavService from '../../components/sidenav/sidenav.service';

const InstanceComponent: ng.IComponentOptions = {
  bindings: {
    instance: '<'
  },
  controller: function($rootScope, SidenavService: SidenavService) {
    this.$onInit = function() {
      SidenavService.set(this.instance.hostname);
    };
  },
  template: require('./instance.html')
};

export default InstanceComponent;
