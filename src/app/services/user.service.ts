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
import { User } from "../../entities/user";

class UserService {
  private baseURL: string;
  private usersURL: string;
  private userURL: string;

  constructor(private $http: ng.IHttpService, private $rootScope, Constants) {
    'ngInject';
    this.baseURL = Constants.baseURL;
    this.usersURL = `${Constants.baseURL}users/`;
    this.userURL = `${Constants.baseURL}user/`;
  }

  list() {
    return this.$http.get(this.usersURL);
  }

  get(code: string): ng.IPromise<User> {
    return this.$http.get(this.usersURL + code).then(response => Object.assign(new User(), response.data));
  }

  create(user) {
    return this.$http.post(`${this.baseURL}users`, user);
  }

  register(user) {
    return this.$http.post(`${this.usersURL}register`, user);
  }

	search(query) {
		return this.$http.get(`${this.usersURL}?query=${query}`);
	}

	// isUserInRoles(roles) {
	//   if (!this.$rootScope.graviteeUser) {
	//     return false;
	//   }
  //
	//   if (this.$rootScope.graviteeUser && (!roles || roles.length === 0)) {
	//     return false;
	//   }
  //
	//   var rolesAllowed = false, that = this;
	//   _.forEach(roles, function(role) {
	//     _.forEach(that.$rootScope.graviteeUser.authorities, function(authority) {
   //      if (authority.authority === role) {
	//         rolesAllowed = true;
	//         return;
	//       }
	//     });
	//   });
  //
	//   return rolesAllowed;
	// }

  current(): ng.IPromise<User> {
    return this.$http.get(this.userURL).then(response => Object.assign(new User(), response.data));
  }

  login(user) {
    return this.$http.post(`${this.userURL}login`, {}, {
      headers: {
        Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`
      }
    });
  }

  logout() {
    return this.$http.post(`${this.userURL}logout`, {});
  }

  currentUserPicture() {
    return this.$http.get(`${this.userURL + this.$rootScope.graviteeUser.username}/picture`);
  }

  save(user) {
    return this.$http.put(`${this.userURL + user.username}/`, {username: user.username, picture: user.picture});
  }

  listPlanSubscription() {
    return this.$http.get(`${this.userURL}subscriptions`);
  }
}

export default UserService;
