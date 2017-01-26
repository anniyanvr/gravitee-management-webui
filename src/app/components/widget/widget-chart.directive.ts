/*
 * Copyright (C) 2015 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as _ from 'lodash';

class WidgetChartDirective {

  constructor() {
    let directive = {
      restrict: 'E',
      templateUrl: 'app/components/widget/widget-chart.html',
      scope: {
        widget: '=widget'
      },
      controller: WidgetChartController,
      controllerAs: 'widgetChartCtrl',
      link: function ($scope, element, attributes, controller) {
        // Refresh widget on each timeframe change
        $scope.$on('onTimeframeChange', function (event, timeframe) {
          let chart = $scope.widget.chart;

          // Associate the new timeframe to the chart request
          _.assignIn(chart.request, {
            interval: timeframe.interval,
            from: timeframe.from,
            to: timeframe.to
          });

          controller.refresh();
        });

        $scope.$on('onQueryFilterChange', function (event, query) {
          let chart = $scope.widget.chart;

          // Associate the new query to the chart request
          _.assignIn(chart.request, {
            query: query.query
          });

          controller.refresh();
        });
      }
    };

    return directive;
  }
}

class WidgetChartController {

  private fetchData: boolean;
  private results: any;
  private widget: any;

  constructor(
    private $scope: ng.IScope) {
    'ngInject';
  }

  refresh() {
    // Call the analytics service
    this.fetchData = true;

    let chart = (this.$scope as any).widget.chart;

    // Prepare arguments
    let args = [(this.$scope as any).widget.root, chart.request];

    if (! (this.$scope as any).widget.root) {
      args.splice(0,1);
    }

    chart.service.function
      .apply(chart.service.caller, args)
      .then(response => {
        this.fetchData = false;
        this.results = response.data;
      });
  }
}

export default WidgetChartDirective;
