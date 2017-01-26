
import SidenavService from '../../components/sidenav/sidenav.service';

const ApplicationComponent: ng.IComponentOptions = {
  bindings: {
    application: '<'
  },
  controller: function(SidenavService : SidenavService) {
    this.$onInit = function() {
      SidenavService.set(this.application.name);
    };
  },
  template: require('./application.html')
};

export default ApplicationComponent;
