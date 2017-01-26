import * as _ from 'lodash';

const DashboardComponent: ng.IComponentOptions = {
  template: require('./dashboard.html'),
  bindings: {
    model: '<'
  },
  controller: function($scope) {
    this.dashboardOptions = {
      margins: [10, 10],
      columns: 6,
      swapping: false,
      draggable: {
        enable: true,
        handle: 'md-card-title'
      },
      resizable: {
        enabled: true,
        stop: function () {
          $scope.$broadcast('onWidgetResize');
        }
      },
      rowHeight: 330
    };

    $scope.$on('timeframeChange', function (event, timeframe) {
      $scope.$broadcast('onTimeframeChange', timeframe);
    });

    $scope.$on('queryFilterChange', function (event, query) {
      $scope.$broadcast('onQueryFilterChange', query);
    });

    this.$onInit = function() {
      const that = this;
      _.each(this.model, function(widget) {
        widget.$uid = that.guid();
      });
    };

    this.guid = function() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }
  }
};

export default DashboardComponent;
