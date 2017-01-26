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

class PageDirective {
  constructor () {
    let directive = {
      restrict: 'E',
      templateUrl: 'app/components/documentation/page.html',
      scope: {
        page: '=',
        enableTryIt: '='
      },
      controller: PageController,
      controllerAs: 'pageCtrl'
    };

    return directive;
  }
}

class PageController {

  private MARKDOWN_PAGE = 'MARKDOWN';
  private RAML_PAGE = 'RAML';
  private SWAGGER_PAGE = 'SWAGGER';

  private url: string;

  constructor(private $scope, private $rootScope, private $state, private Constants) {
    'ngInject';

    if ($scope.$parent.page === undefined) {
      this.url = Constants.baseURL + 'apis/' + $state.params.apiId + '/pages/' + $state.params.pageId + '/content';
    } else {
      this.url = Constants.baseURL + 'apis/' + $state.params.apiId + '/pages/' + $scope.$parent.page.id + '/content';
    }
  }

  ramlType() {
    return this.$scope.page && this.RAML_PAGE === this.$scope.page.type;
  }

  markdownType() {
    return this.$scope.page && this.MARKDOWN_PAGE === this.$scope.page.type;
  }

  swaggerType() {
    return this.$scope.page && this.SWAGGER_PAGE === this.$scope.page.type;
  }

  enableTryIt() {
    if (this.$scope.page.type !== 'SWAGGER') {
      return false;
    }
    return !_.isNil(this.$scope.page.configuration) && this.$scope.page.configuration.tryIt && this.$rootScope.graviteeUser;
  }
}

export default PageDirective;
