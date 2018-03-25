(function () {
  'use strict';

  angular
    .module('revapm.Portal.Auth')
    .factory('User', User);

  /*@ngInject*/
  function User($localStorage, $http, $config, $q, DomainsConfig, $auth, Groups, $state, AlertService) {

    /**
     * List of Users domains
     * @type {Array}
     */
    var domains = [];

    /**
     * Domain that should be selected
     *
     * @type {object|null}
     */
    var domainSelected = null;

    /**
     * List of Users applications
     * @type {Array}
     */
    var apps = [];
    var appSelected = null;

    /**
     * List of Users accounts
     * @type {Array}
     */
    var accounts = [];
    var accSelected = null;


    /**
     * List of Users DNS Zones
     * @type {Array}
     */
    var DNSZoneList = [];
    var dnsZoneSelected = null;

    var permissions = $localStorage.group ? $localStorage.group.permissions : null;

    /**
     * Clear all details from localstorage
     */
    function clearAll() {
      if (!$localStorage || $localStorage.intro === undefined) {
        return;
      }
      var intro_ = $localStorage.intro;
      intro_.isSkipIntro = false;
      $localStorage.$reset({
        user: null,
        group: null,
        isLoggedIn: false,
        isCAdmin: false,
        last_user_id: null,
        selectedAccount: null,
        selectedApplication: null,
        selectedDNSZone: null,
        intro: intro_,
        lastUrl: null
      });
    }

    /**
     * Get token from localStorage
     *
     * @returns {string|boolean}
     */
    function getToken() {
      return $localStorage.Authorization || false;
    }

    /**
     * Set new auth token into localStorage
     *
     * @param {string} token
     */
    function setToken(token) {
      if (!token) {
        return;
      }
      $localStorage.Authorization = token;
    }

    /**
     * Check if user authorized
     *
     * @returns {boolean}
     */
    function isAuthed() {
      var token = getToken();
      if (token) {
        // parse or something
        return true;
      } else {
        return false;
      }
    }

    /**
     * Will add an `Authorization` header for application
     *
     * @param {string} token
     */
    function addAuthHeaderForAPI(token) {
      $localStorage.Authorization = 'Bearer ' + token;
      $http.defaults.headers.common.Authorization = 'Bearer ' + token;
      $http.defaults.headers.common['Content-Type'] = 'application/json';
    }

    /**
     * Will remove `Authorization` header from application
     */
    function clearAuthHeaderForAPI() {
      $localStorage.Authorization = undefined;
      delete $http.defaults.headers.common.Authorization;
    }

    function _successGetUserMyself(data) {
              if (data && data.status === $config.STATUS.OK) {                
                // Success
                var res = data.data;           

                // Check roles
                if (res.role !== $config.ROLE.USER &&
                  res.role !== $config.ROLE.ADMIN &&
                  res.role !== $config.ROLE.RESELLER &&
                  res.role !== $config.ROLE.REVADMIN) {
                  // do not have permission
                  throw new Error('You do not have permission');
                }
                // Store data
                $localStorage.isLoggedIn = true;
                $localStorage.isCAdmin = true;
                //$localStorage.isAdmin = res.is_admin;
                $localStorage.user = res;
                domains = [];
                if ( $localStorage.last_user_id !== res.user_id ) {
                  //  user changed - applications list and stored application are not valid
                  apps = [];
                  selectApplication( null );
                  accounts = [];
                  getUserAccounts(false)
                    .then(function (res) {
                      selectAccount(res[0]);
                    });
                  //selectAccount( null );
                  $localStorage.last_user_id = res.user_id;
                }
              } else {
                // Something went wrong
                throw new Error(data.response);
              }
              return data;
            }

    function  authenticate(provider) {
     return $auth.authenticate(provider).then(function (data) {
        if (data.status === $config.STATUS.OK) {
          setToken(data.data.token);
          addAuthHeaderForAPI(data.data.token);
          return $http.get($config.API_URL + '/users/myself')
            .then(_successGetUserMyself );
        }
        return data;
      }).catch(function (err) {
        clearAuthHeaderForAPI();
        return $q.reject(err);
      });
    }
    /**
     * Method to login
     *
     * @throws Error
     * @param {string} email
     * @param {string} password
     * @param {string?} [oneTimePassword]
     * @returns {Promise}
     */
    function login(email, password, oneTimePassword) {
      if (!email || !password) {
        throw new Error('Please fill email and password');
      }
      // Create data that will be sent to login
      var authData = {
        email: email,
        password: password
      };
      //Check and add one time password
      if (oneTimePassword) {
        authData.oneTimePassword = oneTimePassword;
      }
      return $http.post($config.API_URL + '/authenticate', authData).then(function (data) {
        if (data.status === $config.STATUS.OK) {
          setToken(data.data.token);
          addAuthHeaderForAPI(data.data.token);
          return $http.get($config.API_URL + '/users/myself')
            .then(_successGetUserMyself );
        }
        return data;
      }).catch(function (err) {
        clearAuthHeaderForAPI();
        return $q.reject(err);
      });
    }

    /**
     * Log user out and clear LocalStorage
     */
    function logout() {
      setToken(); // set token to undefined
      // Clear user
      $localStorage.user = undefined;

      // Clear activity filter data
      $localStorage.activityFilterData = undefined;

      // Clear form data
      $localStorage.selectedUser = undefined;
      $localStorage.selectedCompany = undefined;
      $localStorage.selectedDomain = undefined;
      
      clearAuthHeaderForAPI();
      clearAll();
    }

    /**
     * Load user details from localStorage
     *
     * @returns {object|null}
     */
    function getUser() {      
      return $localStorage.user || null;
    }

    /**
     * Check if user is admin
     *
     * @returns {boolean}
     */
    function isAdmin() {
      var user = getUser();
      return Boolean(isAuthed() && user && user.role === $config.ROLE.ADMIN);
    }

    /**
     * Check if user is reseller
     *
     * @returns {boolean}
     */
    function isReseller() {
      var user = getUser();
      return Boolean(isAuthed() && user && user.role === $config.ROLE.RESELLER);
    }


    /**
     * Check if user is revadmin
     *
     * @returns {boolean}
     */
    function isRevadmin() {
      var user = getUser();
      return Boolean(isAuthed() && user && user.role === $config.ROLE.REVADMIN);
    }

    /**
     * Check if user has user role
     *
     * @returns {boolean}
     */
    function isUser() {
      var user = getUser();
      return Boolean(isAuthed() && user && user.role === $config.ROLE.USER);
    }

    /**
     * Check if user account have set billing plan
     *
     * @returns {boolean}
     */
    function hasBillingPlan() {
      var account = getSelectedAccount() || {};
      return Boolean(account.billing_plan);
    }

    /**
     * Reload user details
     * @returns {*}
     */
    function reloadUser() {
      return $http.get($config.API_URL + '/users/myself')
        .then(function (data) {
          if (data && data.status === $config.STATUS.OK) {
            $localStorage.user = data.data;
            permissions = $localStorage.user.permissions;
            if ($localStorage.user.group_id && $localStorage.user.group_id !== 'null') {
              Groups.get({ id: $localStorage.user.group_id }).$promise.then(function (group) {
                $localStorage.group = group;
                permissions = group ? group.permissions : $localStorage.user.permissions;
                checkEnforce2FA();
              });
            }   
          } else {
            // Something went wrong
            throw new Error(data.response);
          }
          return data;
        });
    }

    /**
     * Forgot password foor email
     *
     * @param {string} email
     */
    function forgotPassword(email) {
      return $http.post($config.API_URL + '/forgot', {email: email})
        .then(function (data) {
          if (data && data.status !== $config.STATUS.OK) {
            // Something went wrong
            throw new Error(data.response);
          }
          return data;
        });
    }

    /**
     * Reset password
     *
     * @param {string} token
     * @param {string} password
     * @returns {Promise}
     */
    function resetPassword(token, password) {
      return $http.post($config.API_URL + '/reset/' + token, {password: password})
        .then(function (data) {
          if (data && data.status !== $config.STATUS.OK) {
            // Something went wrong
            throw new Error(data.response);
          }
          return data;
        });
    }

    /**
     * Update current users password
     *
     * @throws Error is user not authed
     * @param {string} currentPassword
     * @param {string} newPassword
     * @returns {Promise}
     */
    function updatePassword(currentPassword, newPassword) {
      var user = getUser();
      if (!isAuthed() || !user.user_id) {
        throw new Error('User not authentificated');
      }
      return $http.put($config.API_URL + '/users/password/' + user.user_id, {
        current_password: currentPassword,
        new_password: newPassword
      }).then(function (data) {
        if (data && data.status !== $config.STATUS.OK) {
          throw new Error(data.response);
        }
        // Update auth headers
        //addAuthHeaderForAPI(user.email, newPassword);
        return login(user.email, newPassword).then(function(){
           return data;
        });
      });
    }

    /**
     * Load user domains
     * @param {boolean} reload
     * @returns {Promise}
     */
    function getUserDomains(reload) {
      return $q(function (resolve, reject) {
        if (domains && domains.length > 0 && !reload) {
          return resolve(domains);
        }
        DomainsConfig.query()
          .$promise
          .then(function (data) {
            domains = data;
            resolve(domains);
          })
          .catch(function (err) {
            domains = [];
            resolve(domains);
          });
      }.bind(this));
    }

    /**
     * Select domain
     * @param {object|null} domain
     */
    function selectDomain(domain) {
      domainSelected = domain;
    }

    /**
     * Get domain selected by user
     *
     * @returns {Object|null}
     */
    function getSelectedDomain() {
      return domainSelected;
    }

    /**
     * Load user applications
     * @param {boolean} reload
     * @returns {Promise}
     */
    function getUserApps(reload) {
      var self = this;
      return $q(function (resolve, reject) {
        if (apps.length > 0 && !reload) {
          return resolve(apps);
        }
        $http.get($config.API_URL + '/apps')
          .then( function (data) {
            if (data && data.status === $config.STATUS.OK) {
              apps = data.data.map( function( item ) {
                  return {
                    app_platform: item.app_platform,
                    app_name: item.app_name,
                    app_id: item.id,
                    id: item.id,
                    sdk_key: item.sdk_key
                  };
                })
                .sort( function( lhs, rhs ) {
                  return lhs.app_name.localeCompare( rhs.app_name );
                });

              var user = getUser();
              if ( apps.length && !self.isRevadmin()) {
                apps.unshift({
                  app_id: '',
                  app_name: 'All Applications'
                });
              }
              resolve( apps );
            } else {
              reject( new Error(data.response) );
            }
          });
      });
    }

    function selectApplication( app ) {
      $localStorage.selectedApplication = app;
      appSelected = app;
    }

    function getSelectedApplication() {
      // return appSelected || $localStorage.selectedApplication;
      return $localStorage.selectedApplication || appSelected;
    }

    /**
     * @name selectDNSZone
     * @description save data about selected DNS Zone
     * @returns
     */
    function selectDNSZone( zone ) {
      $localStorage.selectedDNSZone = zone;
      dnsZoneSelected = zone;
    }
    /**
     * @name getSelectedDNSZone
     * @description get data a last selected DNS Zone
     * @returns {null| Object}
     */
    function getSelectedDNSZone() {
      return $localStorage.selectedDNSZone || dnsZoneSelected;
    }

    /**
     * Load user Companies/Accounts
     * @param {boolean} reload
     * @returns {Promise}
     */
    function getUserAccounts(reload) {
      return $q(function (resolve, reject) {
        if (accounts.length > 0 && !reload) {
          return resolve(accounts);
        }
        $http.get($config.API_URL + '/accounts')
          .then( function (data) {

            if (data && data.status === $config.STATUS.OK) {
              accounts = data.data.map( function( item ) {
                  return {
                    acc_name: item.companyName,
                    acc_id: item.id,
                    plan_id: item.billing_plan,// TODO:delete property name
                    billing_plan: item.billing_plan,
                    vendor_profile: item.vendor_profile
                  };
                })
                .sort( function( lhs, rhs ) {
                  return lhs.acc_name.localeCompare( rhs.acc_name );
                });

              var user = getUser();
              if ( accounts.length > 1 && user ) {
                accounts.unshift({
                  acc_id: '',
                  acc_name: 'All Accounts'
                });
              }
              resolve( accounts );
            } else {
              reject( new Error(data.response) );
            }
          })
          .catch( function( err ) {
            // console.log( err );
          });
      });
    }

    function selectAccount( acc ) {
      $localStorage.selectedAccount = acc;
      accSelected = acc;
    }

    function getSelectedAccount() {
      return accSelected || $localStorage.selectedAccount;
    }

    /**
     * @name getUserDNSZones
     * @description get all DNS Zones available for current User
     * @param {Boolean} reload
     * @returns
     */
    function getUserDNSZones(reload) {
      return $q(function (resolve, reject) {
        if (DNSZoneList.length > 0 && !reload) {
          return resolve(DNSZoneList);
        }
        $http.get($config.API_URL + '/dns_zones')
          .then( function (data) {

            if (data && data.status === $config.STATUS.OK) {
              DNSZoneList = data.data.map( function( item ) {
                  return {
                    zone: item.zone,
                    id: item.id,
                    account_id: item.account_id
                  };
                });
              var user = getUser();
              if ( DNSZoneList.length > 1 && user ) {
                DNSZoneList.unshift({
                  acc_id: '',
                  acc_name: 'All DNS Zones'
                });
              }
              resolve( DNSZoneList );
            } else {
              reject( new Error(data.response) );
            }
          })
          .catch( function( err ) {
            // console.log( err );
          });
      });
    }

    function updateToken(token) {
      var def = $q.defer();
      if (!!token) {
        setToken(token);
        addAuthHeaderForAPI(token);
        $http.get($config.API_URL + '/users/myself')
          .then(_successGetUserMyself).then(function(data) {
            def.resolve(data);
          });
      } else {
        def.reject({
          message: 'Token not correct'
        });
      }
      return def.promise;
    }

    function deleteAccountProfile(account_id, data) {
      var def = $q.defer();
      var config = {
        method: 'DELETE',
        url: $config.API_URL + '/accounts/' + account_id,
        data: data,
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      };

      $http(config)
        .then(function(data) {
          //NOTE: auto logout, but not redirect
          logout();
          def.resolve(data);
        }, def.reject);

      return def.promise;
    }

    /**
     * Azure SSO authentication
     *
     * @param {string} token
     * @returns {Promise}
     */
    function authAzureSSO(token, resourceId) {
      return $http.post($config.API_URL + '/authenticate-sso-azure', { token: token, resourceId: resourceId })
        .then(function(data) {
          if (data && data.status !== $config.STATUS.OK) {
            // Something went wrong
            throw new Error(data.response);
          }
          return updateToken(data.data.token).then(function(userData) {
            return userData;
          });
        });
    }

    /**
     * @name getACL
     * @return {Object} user permission
     */
    function getACL(){
      var user = getUser();
      var defaultACL = {
        readOnly: true,
        test: false,
        configure: false,
        reports: false,
        dashBoard: true
      };
      return (!!user)  ? user.access_control_list :  defaultACL;
    }

    function getGroup() {
      return $localStorage.group || null;
    }
    /**
     * @name isReadOnly
     * @description
     *
     * @return {Boolean}
     */
    function isReadOnly(){
      return permissions ? permissions.read_only : false;
    }

    function hasAccessTo(item) {
      if (permissions && permissions[item] !== null) {
        if (permissions[item].access !== undefined) {
          return permissions[item].access;
        } else {
          return permissions[item];
        }
      }

      return false;
    }

    function isEnforce2FA() {
      return permissions ? permissions.enforce_2fa && !getUser().two_factor_auth_enabled : false;
    }

    function checkEnforce2FA(event, toState, fromState) {
      if (!event && !toState && !fromState) {
        if (!$state.is('index.accountSettings.2fa') && isEnforce2FA()) {
          $state.go('index.accountSettings.2fa');
          return;
        }        
      } else {
        if (isEnforce2FA()) {
          AlertService.danger('2FA is enforced, please set up 2FA.');
        }
        if (isEnforce2FA() && toState !== 'index.accountSettings.2fa') {
          event.preventDefault();
        }
        if (isEnforce2FA() && fromState !== 'index.accountSettings.2fa') {
          $state.go('index.accountSettings.2fa');
        }
      }
    }

    return {

      checkEnforce2FA: checkEnforce2FA,

      isEnforce2FA: isEnforce2FA,

      hasAccessTo: hasAccessTo,

      getToken: getToken,

      setToken: setToken,

      updateToken: updateToken,

      isAuthed: isAuthed,

      login: login,

      logout: logout,

      getUser: getUser,

      isAdmin: isAdmin,

      isReseller: isReseller,

      isRevadmin: isRevadmin,

      isUser: isUser,

      reloadUser: reloadUser,

      forgotPassword: forgotPassword,

      resetPassword: resetPassword,

      updatePassword: updatePassword,

      getUserDomains: getUserDomains,

      selectDomain: selectDomain,

      getSelectedDomain: getSelectedDomain,

      getUserApps: getUserApps,

      selectApplication: selectApplication,

      getSelectedApplication: getSelectedApplication,

      getUserAccounts: getUserAccounts,

      selectAccount: selectAccount,

      getSelectedAccount: getSelectedAccount,

      hasBillingPlan: hasBillingPlan,

      deleteAccountProfile: deleteAccountProfile,

      authAzureSSO: authAzureSSO,

      authenticate: authenticate,

      getACL: getACL,

      isReadOnly: isReadOnly,

      getUserDNSZones: getUserDNSZones,

      selectDNSZone: selectDNSZone,

      getSelectedDNSZone: getSelectedDNSZone
    };
  }
})();
