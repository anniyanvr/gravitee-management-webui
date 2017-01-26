const InstanceMonitoringComponent: ng.IComponentOptions = {
  bindings: {
    monitoringData: "<",
    instance: "<"
  },
  controller: "InstanceMonitoringController",
  template: require("./instance-monitoring.html")
};

export default InstanceMonitoringComponent;
