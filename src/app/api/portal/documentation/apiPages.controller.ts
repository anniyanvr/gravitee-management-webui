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
class ApiPortalPagesController {
  private pages: any;

  constructor(private resolvedPages, private $scope, private $stateParams, private $location) {
    'ngInject';
    this.pages = resolvedPages.data;

    $scope.selectedIndex = 0;

    $scope.$watch('selectedIndex', (current) => {
      if (this.pages.length && !$stateParams.pageId && !current) {
        $location.url(`/apis/${$stateParams.apiId}/pages/${this.pages[0].id}`);
      }
    });
  }
}

export default ApiPortalPagesController;
