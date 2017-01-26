import * as _ from 'lodash';

const WidgetComponent: ng.IComponentOptions = {
  template: require('./widget.html'),
  bindings: {
    widget: '<'
  },
  controller: function($scope: ng.IScope) {
    $scope.$on('gridster-resized', function () {
      $scope.$broadcast('onWidgetResize');
    });

    let that = this;

    $scope.$on('onTimeframeChange', function (event, timeframe) {
      // Associate the new timeframe to the chart request
      _.assignIn(that.widget.chart.request, {
        interval: timeframe.interval,
        from: timeframe.from,
        to: timeframe.to
      });

      that.reload();
    });

    $scope.$on('onQueryFilterChange', function (event, query) {
      // Associate the new query filter to the chart request
      _.assignIn(that.widget.chart.request, {
        query: query.query
      });

      that.reload();
    });

    this.reload = function() {
      // Call the analytics service
      this.fetchData = true;

      let chart = this.widget.chart;

      // Prepare arguments
      let args = [this.widget.root, chart.request];

      if (! this.widget.root) {
        args.splice(0,1);
      }

      chart.service.function
        .apply(chart.service.caller, args)
        .then(response => {
          this.fetchData = false;
          this.results = response.data;
        });
    };
  }
};

export default WidgetComponent;
