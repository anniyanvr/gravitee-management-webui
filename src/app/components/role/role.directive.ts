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
import UserService from "../../services/user.service";
import IDirective = angular.IDirective;
import * as angular from "angular";

const RoleDirective: ng.IDirectiveFactory = () => ({
  restrict: 'AE',
  link: function (scope, elem, attr, ctr: {UserService: UserService}) {
    let roles = attr['graviteeRolesAllowed'].replace(/ /g,'').split(',');

    // if(!(ctr.UserService.isUserInRoles(roles))) {
      // console.log(arguments);
      // angular.element(elem).hide();
    // }
  },
  controller: RoleController
} as IDirective);

// class RoleDirective {
//   private restrict: string;
//   private controller;
//
//   constructor () {
//     'ngInject';
//     this.restrict = 'AE';
//     this.controller = RoleController;
//   }
//
//   link(scope, elem, attr, ctr) {
//     let roles = attr.graviteeRolesAllowed.replace(/ /g,'').split(',');
//
//     if(!ctr.UserService.isUserInRoles(roles)){
//       elem.hide();
//     }
//   }
// }

class RoleController {
  constructor (private UserService) {
    'ngInject';
  }
}

export default RoleDirective;
