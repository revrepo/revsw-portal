/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2015] Rev Software, Inc.
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Rev Software, Inc. and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Rev Software, Inc.
 * and its suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Rev Software, Inc.
 */

// # Domain Form Page Object

// Requiring constant values
var Constants = require('./../constants');

var DropDownWidget = require('./../common/dropDownWidget');

// This `Domain Form` Page Object abstracts all operations or actions that a
// common domain could do in the Add Domain and Edit Domain page from the Portal
// app/site.
var DomainForm = {

  // ## Properties
  // Locators specific to HTML elements from this page object
  locators: {
    textInputs: {
      domainName: {
        id: 'domain_name'
      },
      domainCname: {
        id: 'cname'
      },
      originServer: {
        model: 'model.origin_server'
      },
      originHostHeader: {
        model: 'model.origin_host_header'
      },
      blueTriangleTechKey: {
        css: 'input[ng-model="model.btt_key"]'
      },
      wildcardDomainAlias: {
        id: 'domain_wildcard_alias'
      },
      nonWildcardDomainAliases: {
        css: '#domain_aliases input[ng-model="$select.search"]'
      },
      originMonitoringHTTPrequest: {
        css: 'input[ng-model="model.origin_health_probe.HTTP_REQUEST"]'
      },
      URL: {
        css: '.domain-caching-rules:first-child input[ng-model="$ctrl.rule.url.value"]'
      },
      queryStringParametersToDropKeep: {
        css: 'div[name="queryStringKeepOrRemoveList"] input'
      },
      allowedSSLprotocols: {
        css: 'input[ng-model="model.ssl_protocols"]'
      },
      allowedSSLciphers: {
        id: 'ssl_ciphers'
      },
      backendName: {
        css: 'div[ng-form="customVclBackendForm"]:first-child input[name="backendName"]'
      },
      originHost: {
        css: 'div[ng-form="customVclBackendForm"]:first-child input[name="originHost"]'
      },

      urlLocationBP: {
        css: 'div[ng-if="$ctrl.domain.bp_lua_enable_all"] input[ng-model="$ctrl.luaBlock.location"]'
      },
      urlLocationCO: {
        css: 'div[ng-if="$ctrl.domain.co_lua_enable_all"] input[ng-model="$ctrl.luaBlock.location"]'
      }

    },
    textareas: {
      backendVCLcode: {
        css: 'div[ng-form="customVclBackendForm"]:first-child #vclHit'
      },
      comment: {
        id: 'comment'
      },
      recvFunction: {
        css: 'textarea[name="vclRecv"]'
      },

      luaCodeBP: {
        css: 'div[ng-if="$ctrl.domain.bp_lua_enable_all"] textarea[name="luaBlockCode"]'
      },      
      luaCodeCO: {
        css: 'div[ng-if="$ctrl.domain.co_lua_enable_all"] textarea[name="luaBlockCode"]'
      }
    },
    numberInputs: {
      dataReadTimeout: {
        css: 'input[name="proxyTimeout"]'
      },
      probeTimeout: {
        css: 'input[name="originHealthProbePROBE_TIMEOUT"]'
      },
      probeInterval: {
        css: 'input[name="originHealthProbePROBE_INTERVAL"]'
      },
      expectedHTTPresponseCode: {
        css: 'input[name="originHealthProbeHTTP_STATUS"]'
      },
      edgeCacheTTL: {
        css: 'input[name="newTTL"]'
      },
      originTCPport: {
        css: 'div[ng-form="customVclBackendForm"]:first-child input[name="backendOriginTCPPort"]'
      } 
    },
    radioInputs: {
      useEndUserProtocol: {
        css: '[for="origin_secure_protocol"] + div > .radio-inline:nth-child(1) input[ng-model="model.origin_secure_protocol"]'
      },
      httpsOnly: {
        css: '[for="origin_secure_protocol"] + div > .radio-inline:nth-child(2) input[ng-model="model.origin_secure_protocol"]'
      },
      httpOnly: {
        css: '[for="origin_secure_protocol"] + div > .radio-inline:nth-child(3) input[ng-model="model.origin_secure_protocol"]'
      },
      predefinedSSLconfigurationProfile: {
        css: '.ssl-certificate-configuration .col-md-5 .form-group:first-child input[ng-model="isCustomSSL_conf_profile"]'
      },
      customSSLconfigurationProfile: {
        css: '.ssl-certificate-configuration .col-md-5 .form-group:last-child input[ng-model="isCustomSSL_conf_profile"]'
      }
    },
    selects: {
      sslConfProfile: {
        css: 'select[ng-model="model.ssl_conf_profile"]'
      }
    },
    checkboxes: {
      preferServerSideCiphers: {
        id: 'ssl_prefer_server_ciphers'
      },
      oneAtATime: {
        css: 'input[ng-model="oneAtATime"]'
      }
    },
    switches: {
      mainAttrs: {
        ariaChecked: 'aria-checked'
      },
      lastMileQUICprotocol: {
        css: 'div[ng-model="model.rev_component_bp.enable_quic"]'
      },
      blockAllWebCrawlers: {
        css: 'div[ng-model="model.rev_component_bp.block_crawlers"]'
      },
      RUMdataCollection: {
        css: 'div[ng-model="model.rev_component_co.enable_rum"]'
      },
      originHealthMonitoring: {
        css: 'div[ng-model="model.enable_origin_health_probe"]'
      },
      edgeCaching: {
        css: 'div[ng-model="model.rev_component_bp.enable_cache"]'
      },
      overrideOriginCachingHeaders: {
        css: 'div[ng-model="$ctrl.rule.edge_caching.override_origin"]'
      },
      edgeCachingHeadersMissing: {
        css: 'div[ng-model="$ctrl.rule.edge_caching.override_no_cc"]'
      },
      keepOrDropQueryStringParameters: {
        css:'div[ng-model="$ctrl.rule.edge_caching.query_string_list_is_keep"]'
      },
      overrideHTTPcookies: {
        css: 'div[ng-model="$ctrl.rule.cookies.override"]'
      },
      overrideEdgeCaching: {
        css: 'div[ng-model="$ctrl.rule.browser_caching.override_edge"]'
      },
      forceRevalidation: {
        css: 'div[ng-model="$ctrl.rule.browser_caching.force_revalidate"]'
      },
      enableServingStaleContent: {
        css: 'div[ng-model="$ctrl.rule.serve_stale.enable"]'
      },
      enableESI: {
        css: 'div[ng-model="$ctrl.rule.enable_esi"]'
      },
      acceptSSLrequests: {
        css: 'div[ng-model="model.enable_ssl"]'
      },
      customVCLrules: {
        css: 'div[ng-model="model.rev_component_bp.custom_vcl.enabled"]'
      },
      dynamicOriginDNSnameLookups: {
        css: 'div[ng-form="customVclBackendForm"]:first-child div[ng-model="item.dynamic"]'
      },
      enableLuaScriptingOnEdgeLastMile: {
        css: 'div[ng-model="$ctrl.domain.bp_lua_enable_all"]'
      },
      enableLuaScriptingOriginFirstMile: {
        css: 'div[ng-model="$ctrl.domain.co_lua_enable_all"]'
      },




      enableThisCodeBlockBP: {
        css: 'div[ng-model="$ctrl.luaBlock.enable"]'
      },
      revAPMadminApprovalBP: {
        css: 'div[ng-if="$ctrl.domain.bp_lua_enable_all"] div[name="customVcl"]'
      },


      enableThisCodeBlockCO: {
        css: 'div[ng-model="$ctrl.luaBlock.enable"]'
      },
      revAPMadminApprovalCO: {
        css: 'div[ng-if="$ctrl.domain.co_lua_enable_all"] div[name="customVcl"]'
      },


    },
    dropDowns: {
      companyName: {
        model: 'model.account_id'
      },
      originServerLocation: {
        model: 'model.origin_server_location_id'
      },
      sslCert: {
        model: 'model.ssl_cert_id'
      }
    },

    buttons: {
      onAddNewCachingRule: {
        css: '[title="Add New Caching Rule"]'
      },
      onAddNewBackendBlock: {
        css: '[title="Add New Backend Block"]'
      },
      btnCopyCname: {
        css: '.btn-copy--cname'
      },
      manageSSLcertificates: {
        css: '[ui-sref="index.webApp.ssl_certs"]'
      },
      onAddNewItemBP: {
        css: '[ng-click="$ctrl.onAddNewItemBP()"]'
      },
      onAddNewItemCO: {
        css: '[ng-click="$ctrl.onAddNewItemCO()"]'
      }
    },
    blocks: {
      customVCLrules: {
        css: 'div[ng-model="model.rev_component_bp.custom_vcl"]'
      },
      functionBlock: {
        css: 'div[ng-model="model.rev_component_bp.custom_vcl"] .panel-default'
      },
      backends: {
        css: 'div[ng-model="$ctrl.customVcl.backends"]'
      },
      luaScriptsExecutedLastMile: {
        css: 'div[ng-if="$ctrl.domain.bp_lua_enable_all"]' 
      },
      luaScriptsExecutedFirstMile: {
        css: 'div[ng-if="$ctrl.domain.co_lua_enable_all"]' 
      }
    },
    tabs:{
      generalSettings: {
        li: '.domain-edit-form .nav.nav-tabs>li:nth-child(1)',
        css: '.domain-edit-form .nav.nav-tabs>li:nth-child(1) a'
      },
      originHealthMonitoring: {
        li: '.domain-edit-form .nav.nav-tabs>li:nth-child(2)',
        css: '.domain-edit-form .nav.nav-tabs>li:nth-child(2) a'
      },
      edgeCaching: {
        li: '.domain-edit-form .nav.nav-tabs>li:nth-child(3)',
        css: '.domain-edit-form .nav.nav-tabs>li:nth-child(3) a'
      },
      sslConfiguration: {
        li: '.domain-edit-form .nav.nav-tabs>li:nth-child(4)',
        css: '.domain-edit-form .nav.nav-tabs>li:nth-child(4) a'
      },
      customVCLRules:{
        li: '.domain-edit-form .nav.nav-tabs>li:nth-child(5)',
        css: '.domain-edit-form .nav.nav-tabs>li:nth-child(5) a'
      },
      luaScripting:{
        li: '.domain-edit-form .nav.nav-tabs>li:nth-child(6)',
        css: '.domain-edit-form .nav.nav-tabs>li:nth-child(6) a'
      }
    }
  },



  getOnAddNewCachingRule: function () {
    return element(by.css(this.locators.buttons.onAddNewCachingRule.css));
  },
  getOnAddNewBackendBlock: function () {
    return element(by.css(this.locators.buttons.onAddNewBackendBlock.css));
  },
  getBtnCopyCname: function () {
    return element(by.css(this.locators.buttons.btnCopyCname.css));
  },


  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)
  /**
   * ### DomainForm.getGeneralSettingsTab()
   *
   * Returns the reference to the `General Settings` tab (Selenium WebDriver
   * Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getGeneralSettingsTab: function () {
    return element(by.css(this.locators.tabs.generalSettings.css));
  },
  /**
   * ### DomainForm.getOriginHealthMonitoringTab()
   *
   * Returns the reference to the `Origin Health Monitoring` tab (Selenium WebDriver
   * Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getOriginHealthMonitoringTab: function () {
    return element(by.css(this.locators.tabs.originHealthMonitoring.css));
  },
  /**
   * ### DomainForm.getEdgeCachingTab()
   *
   * Returns the reference to the `Edge Caching` tab (Selenium WebDriver
   * Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getEdgeCachingTab: function () {
    return element(by.css(this.locators.tabs.edgeCaching.css));
  },
  /**
   * ### DomainForm.getSSLConfigurationTab()
   *
   * Returns the reference to the `SSL Certificate` tab (Selenium WebDriver
   * Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getSSLConfigurationTab: function () {
    return element(by.css(this.locators.tabs.sslConfiguration.css));
  },
  /**
   * ### DomainForm.getCustomVCLRulesTab()
   *
   * Returns the reference to the `Custom VCL Rules` tab (Selenium WebDriver
   * Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getCustomVCLRulesTab: function () {
    return element(by.css(this.locators.tabs.customVCLRules.css));
  },

  getLuaScriptingTab: function () {
    return element(by.css(this.locators.tabs.luaScripting.css));
  },

  
  /**
   * ### DomainForm.getDomainNameTxtIn()
   *
   * Returns the reference to the `Domain Name` text field (Selenium WebDriver
   * Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getDomainNameTxtIn: function () {
    return element(by.id(this.locators.textInputs.domainName.id));
  },

  getDomainCnameTxtIn: function () {
    return element(by.id(this.locators.textInputs.domainCname.id));
  },

  /**
   * ### DomainForm.getCompanyNameDDown()
   *
   * Returns the reference to the `Company Name` drop-down (Selenium WebDriver
   * Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getCompanyNameDDown: function () {
    return new DropDownWidget(
      by.model(this.locators.dropDowns.companyName.model));
  },

  getCompanyNameDDownTxtIn: function () {
    return element(by.model(this.locators.dropDowns.companyName.model));
  },

  /**
   * ### DomainForm.getSslCertDDown()
   *
   * Returns the reference to the `SSL Certificate` drop-down (Selenium WebDriver
   * Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getSslCertDDown: function () {
    return element(
        by.model(this.locators.dropDowns.sslCert.model));
  },

  /**
   * ### DomainForm.getSslCertDDownItems()
   *
   * Returns the reference to the `SSL Certificate` drop-down items (Selenium WebDriver
   * Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getSslCertDDownItems: function() {
    this.getSSLConfigurationTab()
      .click();
    return this
      .getSslCertDDown()
      .all(by.css('option'));
  },

  /**
   * ### DomainForm.getOriginServerTxtIn()
   *
   * Returns the reference to the `Origin Server` text field (Selenium WebDriver
   * Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getOriginServerTxtIn: function () {
    return element(by.model(this.locators.textInputs.originServer.model));
  },

  /**
   * ### DomainForm.getLastNameTxtIn()
   *
   * Returns the reference to the `Origin Host Header` text field (Selenium
   * WebDriver Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getOriginHostHeaderTxtIn: function () {
    return element(by.model(this.locators.textInputs.originHostHeader.model));
  },

  getBlueTriangleTechKeyTxtIn: function () {
    return element(by.css(this.locators.textInputs.blueTriangleTechKey.css));
  },

  getWildcardDomainAliasTxtIn: function () {
    return element(by.id(this.locators.textInputs.wildcardDomainAlias.id));
  },

  getNonWildcardDomainAliasesTxtIn: function () {
    return element(by.css(this.locators.textInputs.nonWildcardDomainAliases.css));
  },

  getOriginMonitoringHTTPrequestTxtIn: function () {
    return element(by.css(this.locators.textInputs.originMonitoringHTTPrequest.css));
  },

  getURLtxtIn: function () {
    return element(by.css(this.locators.textInputs.URL.css));
  },

  getQueryStringParametersToDropKeepTxtIn: function () {
    return element(by.css(this.locators.textInputs.queryStringParametersToDropKeep.css));
  },

  getAllowedSSLprotocolsTxtIn: function () {
    return element(by.css(this.locators.textInputs.allowedSSLprotocols.css));
  },

  getAllowedSSLciphersTxtIn: function () {
    return element(by.id(this.locators.textInputs.allowedSSLciphers.id));
  },

  getBackendNameTxtIn: function () {
    return element(by.css(this.locators.textInputs.backendName.css));
  },

  getOriginHostTxtIn: function () {
    return element(by.css(this.locators.textInputs.originHost.css));
  },

  getUrlLocationBP: function () {
    return element(by.css(this.locators.textInputs.urlLocationBP.css));
  },

  getUrlLocationCO: function () {
    return element(by.css(this.locators.textInputs.urlLocationCO.css));
  },

  getCommentTxtIn: function () {
    return element(by.id(this.locators.textareas.comment.id));
  },

  getRecvFunctionTxtIn: function () {
    return element(by.css(this.locators.textareas.recvFunction.css));
  },
  getLuaCodeBP: function () {
    return element(by.css(this.locators.textareas.luaCodeBP.css));
  },

  getLuaCodeCO: function () {
    return element(by.css(this.locators.textareas.luaCodeCO.css));
  },

  getDataReadTimeoutTxtIn: function () {
    return element(by.css(this.locators.numberInputs.dataReadTimeout.css));
  },
  getProbeTimeoutTxtIn: function () {
    return element(by.css(this.locators.numberInputs.probeTimeout.css));
  },

  getProbeIntervalTxtIn: function () {
    return element(by.css(this.locators.numberInputs.probeInterval.css));
  },

  getExpectedHTTPresponseCodeTxtIn: function () {
    return element(by.css(this.locators.numberInputs.expectedHTTPresponseCode.css));
  },

  getEdgeCacheTTLTxtIn: function () {
    return element(by.css(this.locators.numberInputs.edgeCacheTTL.css));
  },

  getOriginTCPportTxtIn: function () {
    return element(by.css(this.locators.numberInputs.originTCPport.css));
  },

  getLastMileQUICprotocolTxtIn: function () {
    return element(by.css(this.locators.switches.lastMileQUICprotocol.css));
  },

  getBlockAllWebCrawlersTxtIn: function () {
    return element(by.css(this.locators.switches.blockAllWebCrawlers.css));
  },

  getRUMdataCollectionTxtIn: function () {
    return element(by.css(this.locators.switches.RUMdataCollection.css));
  },

  getOriginHealthMonitoringTxtIn: function () {
    return element(by.css(this.locators.switches.originHealthMonitoring.css));
  },

  getEdgeCachingTxtIn: function () {
    return element(by.css(this.locators.switches.edgeCaching.css));
  },

  getOverrideOriginCachingHeadersTxtIn: function () {
    return element(by.css(this.locators.switches.overrideOriginCachingHeaders.css));
  },

  getEdgeCachingHeadersMissingTxtIn: function () {
    return element(by.css(this.locators.switches.edgeCachingHeadersMissing.css));
  },

  getKeepOrDropQueryStringParametersTxtIn: function () {
    return element(by.css(this.locators.switches.keepOrDropQueryStringParameters.css));
  },

  getOverrideHTTPcookiesTxtIn: function () {
    return element(by.css(this.locators.switches.overrideHTTPcookies.css));
  },
  getOverrideEdgeCachingTxtIn: function () {
    return element(by.css(this.locators.switches.overrideEdgeCaching.css));
  },

  getForceRevalidationTxtIn: function () {
    return element(by.css(this.locators.switches.forceRevalidation.css));
  },
  getEnableServingStaleContentTxtIn: function () {
    return element(by.css(this.locators.switches.enableServingStaleContent.css));
  },
  getEnableESITxtIn: function () {
    return element(by.css(this.locators.switches.enableESI.css));
  },
  getAcceptSSLrequestsTxtIn: function () {
    return element(by.css(this.locators.switches.acceptSSLrequests.css));
  },
  getCustomVCLrulesTxtIn: function () {
    return element(by.css(this.locators.switches.customVCLrules.css));
  },
  getDynamicOriginDNSnameLookupsTxtIn: function () {
    return element(by.css(this.locators.switches.dynamicOriginDNSnameLookups.css));
  },
  getEnableLuaScriptingOnEdgeLastMile: function () {
    return element(by.css(this.locators.switches.enableLuaScriptingOnEdgeLastMile.css));
  },
  getEnableLuaScriptingOriginFirstMile: function () {
    return element(by.css(this.locators.switches.enableLuaScriptingOriginFirstMile.css));
  },
  getEnableThisCodeBlockBP: function () {
    return element(by.css(this.locators.switches.enableThisCodeBlockBP.css));
  },
  getRevAPMadminApprovalBP: function () {
    return element(by.css(this.locators.switches.revAPMadminApprovalBP.css));
  },
  getEnableThisCodeBlockCO: function () {
    return element(by.css(this.locators.switches.enableThisCodeBlockCO.css));
  },
  getRevAPMadminApprovalCO: function () {
    return element(by.css(this.locators.switches.revAPMadminApprovalCO.css));
  },

  getUseEndUserProtocolTxtIn: function () {
    return element(by.css(this.locators.radioInputs.useEndUserProtocol.css));
  },
  getHttpsOnlyTxtIn: function () {
    return element(by.css(this.locators.radioInputs.httpsOnly.css));
  },
  getHttpOnlyTxtIn: function () {
    return element(by.css(this.locators.radioInputs.httpOnly.css));
  },


  getPredefinedSSLconfigurationTxtIn: function () {
    return element(by.css(this.locators.radioInputs.predefinedSSLconfigurationProfile.css));
  },
  getCustomSSLconfigurationTxtIn: function () {
    return element(by.css(this.locators.radioInputs.customSSLconfigurationProfile.css));
  },


  getManageSSLcertificatesTxtIn: function () {
    return element(by.css(this.locators.buttons.manageSSLcertificates.css));
  },

  getSslConfProfileTxtIn: function () {
    return element(by.css(this.locators.selects.sslConfProfile.css));
  },

  getPreferServerSideCiphersTxtIn: function () {
    return element(by.id(this.locators.checkboxes.preferServerSideCiphers.id));
  },

  getBlockCustomVCLrulesTxtIn: function () {
    return element(by.css(this.locators.blocks.customVCLrules.css));
  },

  getBlockFunctionBlock: function (name) {
    return element(by.css(this.locators.blocks.functionBlock.css + '[heading="\'' + name + '\' Function"]'));
  },
  getOneAtATimeTxtIn: function () {
    return element(by.css(this.locators.checkboxes.oneAtATime.css));
  },

  getBackends: function () {
    return element(by.css(this.locators.blocks.backends.css));
  },

  getBackendVCLcode: function () {
    return element(by.css(this.locators.textareas.backendVCLcode.css));
  },

  getLuaScriptsExecutedLastMile: function () {
    return element(by.css(this.locators.blocks.luaScriptsExecutedLastMile.css));
  },

  getLuaScriptsExecutedFirstMile: function () {
    return element(by.css(this.locators.blocks.luaScriptsExecutedFirstMile.css));
  },

  getOnAddNewItemBP: function () {
    return element(by.css(this.locators.buttons.onAddNewItemBP.css));
  },
  getOnAddNewItemCO: function () {
    return element(by.css(this.locators.buttons.onAddNewItemCO.css));
  },



  /**
   * ### DomainForm.getDomainOriginLocationDDown()
   *
   * Returns the reference to the `Domain Origin Location` drop-down (Selenium
   * WebDriver Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getDomainOriginLocationDDown: function () {
    return element(
      by.model(this.locators.dropDowns.originServerLocation.model));
  },

  // ## Methods to interact with the Domain form components

  /**
   * ### DomainForm.getDomainName()
   *
   * Gets the current value set for Domain Name.
   *
   * @returns {Promise}
   */
  getDomainName: function () {
    return this
      .getDomainNameTxtIn()
      .getAttribute('value');
  },

  /**
   * ### DomainForm.getOriginServer()
   *
   * Gets the current value set for Origin Server.
   *
   * @returns {Promise}
   */
  getOriginServer: function () {
    return this
      .getOriginServerTxtIn()
      .getAttribute('value');
  },

  /**
   * ### DomainForm.getOriginHostHeader()
   *
   * Gets the current value set for Origin Host Header.
   *
   * @returns {Promise}
   */
  getOriginHostHeader: function () {
    return this
      .getOriginHostHeaderTxtIn()
      .getAttribute('value');
  },

  /**
   * ### DomainForm.getDomainOriginLocation()
   *
   * Gets the current value set for Domain Origin Location.
   *
   * @returns {Promise}
   */
  getDomainOriginLocation: function () {
    return this
      .getDomainOriginLocationDDown();
  },

  /**
   * ### DomainForm.getSslCert()
   *
   * Gets the current value set for SSL Certificate.
   *
   * @returns {Promise}
   */
  getSslCert: function() {
    this.getSSLConfigurationTab()
      .click();
    return this
      .getSslCertDDown()
      .all(by.css('option[selected="selected"]'))
      .last()
      .getText();
  },


  /**
   * ### DomainForm.setDomainName()
   *
   * Sets a new value for `Domain Name` text field
   *
   * @param {String} domainName
   *
   * @returns {Promise}
   */
  setDomainName: function (domainName) {
    return this
      .getDomainNameTxtIn()
      .clear()
      .sendKeys(domainName);
  },

  /**
   * ### DomainForm.setCompanyName()
   *
   * Sets a new value for `Company Name` drop-down
   *
   * @param {String} companyName
   *
   * @returns {Promise}
   */
  setCompanyName: function (companyName) {
    return this
      .getCompanyNameDDown()
      .setValue(companyName);
  },

  /**
   * ### DomainForm.setSslCert()
   *
   * Sets a new value for `SSL Certificate` drop-down
   *
   * @param {String} companyName
   *
   * @returns {Promise}
   */
  setSslCert: function(sslCert) {
    var me = this;
    return this.getSSLConfigurationTab()
      .click().then(function() {
        return me
          .getSslCertDDown()
          .sendKeys(sslCert);
      });
  },

  /**
   * ### DomainForm.setOriginServer()
   *
   * Sets a new value for `Origin Server` text field
   *
   * @param {String} originServer
   *
   * @returns {Promise}
   */
  setOriginServer: function (originServer) {
    return this
      .getOriginServerTxtIn()
      .clear()
      .sendKeys(originServer);
  },

  /**
   * ### DomainForm.setOriginHostHeader()
   *
   * Sets a new value for `Origin Host Header` text field
   *
   * @param {String} originHostHeader
   *
   * @returns {Promise}
   */
  setOriginHostHeader: function (originHostHeader) {
    return this
      .getOriginHostHeaderTxtIn()
      .clear()
      .sendKeys(originHostHeader);
  },

  /**
   * ### DomainForm.setDomainOriginLocation()
   *
   * Sets a new value for `Domain Origin Location` drop-down
   *
   * @param {String} domainOriginLocation
   *
   * @returns {Promise}
   */
  setDomainOriginLocation: function (domainOriginLocation) {
    return this
      .getDomainOriginLocation()
      .element(by.cssContainingText('option', domainOriginLocation))
      .click();
  },

  /**
   * ### DomainForm.clearDomainName()
   *
   * Clears the current value set in the `Domain Name` text field
   *
   * @returns {Promise}
   */
  clearDomainName: function () {
    var me = this;
    return this
      .getDomainNameTxtIn()
      .getAttribute('value').then(function (text) {
        var len = text.length;
        var backspaces = new Array(len + 1).join(protractor.Key.BACK_SPACE);
        me
          .getDomainNameTxtIn()
          .sendKeys(backspaces);
      });
  },

  /**
   * ### DomainForm.clearOriginServer()
   *
   * Clears the current value set in the `Origin Server` text field
   *
   * @returns {Promise}
   */
  clearOriginServer: function () {
    var me = this;
    return this
      .getOriginServerTxtIn()
      .getAttribute('value').then(function (text) {
        var len = text.length;
        var backspaces = new Array(len + 1).join(protractor.Key.BACK_SPACE);
        me
          .getOriginServerTxtIn()
          .sendKeys(backspaces);
      });
  },

  /**
   * ### DomainForm.clearOriginHostHeader()
   *
   * Clears the current value set in the `Origin Host Header` text field
   *
   * @returns {Promise}
   */
  clearOriginHostHeader: function () {
    var me = this;
    return this
      .getOriginHostHeaderTxtIn()
      .getAttribute('value').then(function (text) {
        var len = text.length;
        var backspaces = new Array(len + 1).join(protractor.Key.BACK_SPACE);
        me
          .getOriginHostHeaderTxtIn()
          .sendKeys(backspaces);
      });
  },

  /**
   * ### DomainForm.clearDomainOriginLocation()
   *
   * Clears the current value set in the `Domain Origin Location` drop down.
   *
   * @returns {Promise}
   */
  clearDomainOriginLocation: function () {
    var me = this;
    return this
      .getDomainOriginLocationDDown()
      .getAttribute('value').then(function (text) {
        var len = text.length;
        var backspaces = new Array(len + 1).join(protractor.Key.BACK_SPACE);
        me
          .getDomainOriginLocationDDown()
          .sendKeys(backspaces);
      });
  },

  // ## Helper Methods

  /**
   * ### DomainForm.isDisplayed()
   *
   * Checks whether the Domain Form is displayed or not in the UI
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
        .getDomainNameTxtIn()
        .isPresent() &&
      this
        .getOriginServerTxtIn()
        .isPresent() &&
      this
        .getOriginHostHeaderTxtIn()
        .isPresent();
  },

  /**
   * ### DomainForm.clearForm()
   *
   * Clean the Domain Form in the UI.
   *
   * @returns {Promise}
   */
  clear: function () {
    this
      .getDomainNameTxtIn()
      .clear();
    this
      .getOriginServerTxtIn()
      .clear();
    return this
      .getOriginHostHeaderTxtIn()
      .clear();
  },

  /**
   * ### DomainForm.fill()
   *
   * Helper method that fills the Domain Form given specified Domain data object
   *
   * @param {object} domain, domain data with the following schema.
   *
   *    {
   *        name: String,
   *        originServer, String,
   *        originHostHeader, String,
   *        originLocation, String
   *    }
   */
  fill: function (domain) {
    if (domain.name !== undefined) {
      this.setDomainName(domain.name);
    }
    // Fill Company name if data provided and if element is visible/available
    var me = this;
    element.all(by.model(this.locators.dropDowns.companyName.model))
      .then(function (elements) {
        if (domain.companyName !== undefined && elements.length > 0) {
          me.setCompanyName(domain.companyName);
        }
      });
    if (domain.originServer !== undefined) {
      this.setOriginServer(domain.originServer);
    }
    if (domain.originHostHeader !== undefined) {
      this.setOriginHostHeader(domain.originHostHeader);
    }
    if (domain.originLocation !== undefined) {
      this.setDomainOriginLocation(domain.originLocation);
    }
  }
};

module.exports = DomainForm;
