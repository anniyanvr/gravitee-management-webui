import * as _ from 'lodash';

class DashboardFilterController {
  private fields: any;
  private filters: any[];

  constructor(private $scope, private $rootScope) {
    'ngInject';

    this.fields = {};
    this.filters = [];

    var that = this;
    $rootScope.$on('filterItemChange', function (event, filter) {
      if (filter.mode === 'add') {
        that.addFieldFilter(filter);
      } else if (filter.mode === 'remove') {
        that.removeFieldFilter(filter);
      }
    });
  }

  addFieldFilter(filter) {
    let field = this.fields[filter.field] || {filters: {}};
    field.filters[filter.key] = filter.name;

    let label = filter.field + " = '" + filter.name + "'";
    let query = '(' + _.map(_.keys(field.filters), (key) => filter.field + ":" + key).join(' OR ') + ')';

    this.filters.push({
      key: filter.field + '_' + filter.key,
      label: label
    });

    field.query = query;

    this.fields[filter.field] = field;
    this.createAndSendQuery();
  }

  removeFieldFilter(filter) {
    this.removeFilter(filter.field, filter.key);
  }

  deleteChips(event) {
    let parts = event.key.split('_');
    this.removeFilter(parts[0], parts[1]);
  }

  removeFilter(field, key) {
    _.remove(this.filters, (current) => {
      return current.key === field + '_' + key;
    });

    let fieldObject = this.fields[field] || {filters: {}};

    delete fieldObject.filters[key];

    if (Object.keys(fieldObject.filters).length === 0 || _.isEmpty(fieldObject.filters)) {
      delete fieldObject.filters;
    }

    if (! _.isEmpty(fieldObject.filters)) {
      fieldObject.query = '(' + _.map(_.keys(fieldObject.filters), (key) => field + ":" + key).join(' OR ') + ')';
      this.fields[field] = fieldObject;
    } else {
      delete this.fields[field];
    }

    this.createAndSendQuery();
  }

  createAndSendQuery() {
    // Create a query with all the current filters
    let query = _.values(_.mapValues(this.fields, function(value) { return value.query; })).join(' AND ');

    this.$scope.$emit('queryFilterChange', {
      query: query
    });
  }
}

export default DashboardFilterController;
