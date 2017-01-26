
const DashboardTimeframeComponent: ng.IComponentOptions = {
  template: require('./dashboard-timeframe.html'),
  controller: 'DashboardTimeframeController',
  bindings: {
    onChange: '&'
  },
  require: {
    parent: '^gvDashboard'
  },
};

export default DashboardTimeframeComponent;
