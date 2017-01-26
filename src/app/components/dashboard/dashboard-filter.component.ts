
const DashboardFilterComponent: ng.IComponentOptions = {
  template: require('./dashboard-filter.html'),
  controller: 'DashboardFilterController',
  require: {
    parent: '^gvDashboard'
  },
};

export default DashboardFilterComponent;
