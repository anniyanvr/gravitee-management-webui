import * as _ from 'lodash';

const WidgetDataTableComponent: ng.IComponentOptions = {
  template: require('./widget-data-table.html'),
  bindings: {
    data: '<'
  },
  require: {
    parent: '^gvWidget'
  },
  controller: function($scope: ng.IScope) {
    this.$scope = $scope;
    this.selected = [];

    this.$onInit = function() {
      this.widget = this.parent.widget;
    };

    this.$onChanges = function(changes) {
      if (changes.data) {
        let data = changes.data.currentValue;
        this.paging = 1;
        this.results = _.map(data.values, function (value, key) {
          return {
            key: key,
            value: value,
            metadata: (data && data.metadata) ? data.metadata[key] : undefined
          };
        });
      }
    };

    let that = this;
    this.selectItem = function (item) {
      that.updateQuery(item, true);
    };
    this.deselectItem = function (item) {
      that.updateQuery(item, false);
    };

    this.updateQuery = function(item, add) {
      that.$scope.$emit('filterItemChange', {
        widget: that.widget.$uid,
        field: that.widget.chart.request.field,
        key: item.key,
        name: item.metadata.name,
        mode: (add) ? 'add' : 'remove'
      });
    };
  }
};

export default WidgetDataTableComponent;
