import * as _ from 'lodash';

const WidgetChartPieComponent: ng.IComponentOptions = {
  template: require('./widget-chart-pie.html'),
  bindings: {
    data: '<'
  },
  require: {
    parent: '^gvWidget'
  },
  controller: function() {
    this.$onChanges = function(changes) {
      if (changes.data) {
        let data = changes.data.currentValue;
        let values = [];

        let total = _.reduce(data.values, function(sum: number, val: number) {
          return sum + val;
        }, 0);

        let idx = 0;
        let that = this;
        _.forEach(data.values, function(value) {
          let percentage = _.round(value / total * 100);
          values.push({
            name: that.parent.widget.chart.labels[idx], // + ': (' + percentage + '%) ' + value + ' hits',
            y: percentage,
            color: that.parent.widget.chart.colors[idx]
          });
          idx++;
        });

        this.results = {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
          },
          plotOptions: {
            pie: {
              dataLabels: {
                enabled: true,
                distance: -50,
                style: {
                  fontWeight: 'bold',
                  color: 'white'
                }
              },
              startAngle: -90,
              endAngle: 90,
              center: ['50%', '75%']
            }
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          title: {
            text: '<br>' + total +'<br> hits',
            align: 'center',
            verticalAlign: 'middle',
            y: 40
          },
          series: [{
            name: 'Percent hits',
            innerSize: '50%',
            data: values
          }]
        };
      }
    };
  }
};

export default WidgetChartPieComponent;
