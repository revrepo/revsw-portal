/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2017] Rev Software, Inc.
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
      botLocation: {
        model: 'item.location'
      },
      botCallType: {
        model: 'item.call_type'
      },
      botProtectionID: {
        model: 'item.bot_protection_id'
      },
      wafLocation: {
        model: 'item.location'
      },
      domainName: {
        id: 'domain_name'
      },
      domainCname: {
        id: 'cname'
      },
      originServer: {
        id: 'originServer'
      },
      originHostHeader: {
        id: 'origin_host_header'
      },
      blueTriangleTechKey: {
        id: 'blueTriangleTechKey'
      },
      wildcardDomainAlias: {
        id: 'domain_wildcard_alias'
      },
      nonWildcardDomainAliases: {
        id: 'non-Wildcard-Domain-Aliases'
      },
      originMonitoringHTTPrequest: {
        id: 'originMonitoringHTTPrequest'
      },

      cacheBypassLocations: {
        id: 'cacheBypassLocations'
      },
      queryStringParametersToDropKeep: {
        id: 'query_str'
      },
      allowedSSLprotocols: {
        id: 'ssl_protocols'
      },
      allowedSSLciphers: {
        id: 'ssl_ciphers'
      },
      backendName: {
        css: 'div[ng-form="customVclBackendForm"]:first-child input[name="backendName"]'
      },
      originHost: {
        id: 'originHost'
      },

      urlLocationBP: {
        css: 'div[ng-if="$ctrl.domain.bp_lua_enable_all"] input[ng-model="$ctrl.luaBlock.location"]'
      },
      urlLocationCO: {
        css: 'div[ng-if="$ctrl.domain.co_lua_enable_all"] input[ng-model="$ctrl.luaBlock.location"]'
      },
      listOfCookiesToDrop: {
        css: '.cachingRulesURLblock:first-child .listOfCookiesToDrop'
      },
      thirdPartyUrls: {
        id: 'thirdPartyUrls'
      },
      thirdPartyRootRewriteDomains: {
        id: 'thirdPartyRootRewriteDomains'
      },
      thirdPartyRuntimeDomains: {
        id: 'thirdPartyRuntimeDomains'
      },
      imageEngineToken: {
        id: 'imageEngineToken'
      },
      imageEngineAPIKey: {
        id: 'imageEngineAPIKey'
      },
      imageEngineOriginServer: {
        id: 'imageEngineOriginServer'
      }

    },
    textareas: {
      backendVCLcode: {
        id: 'vclHit'
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
      },
      customVCLrulesListFunctions: {
        css: '#customVCLrulesBlock .panel-group .text--courier'
      }
    },
    numberInputs: {
      dataReadTimeout: {
        id: 'proxy_timeout'
      },
      probeTimeout: {
        id: 'probe_timeout'
      },
      probeInterval: {
        id: 'origin_health_probe_PROBE_INTERVAL'
      },
      expectedHTTPresponseCode: {
        id: 'expectedHTTPresponseCode'
      },
      edgeCacheTTL: {
        id: 'edgeCacheTTL'
      },
      originTCPport: {
        id: 'proxy_timeout'
      },
      browserCachingTTL: {
        id: 'browserCachingTTL'
      }
    },
    radioInputs: {
      useEndUserProtocol: {
        id: 'useEndUserProtocol'
      },
      httpsOnly: {
        id: 'httpsOnly'
      },
      httpOnly: {
        id: 'httpOnly'
      },
      predefinedSSLconfigurationProfile: {
        id: 'predefinedSSLconfigurationProfile'
      },
      customSSLconfigurationProfile: {
        id: 'customSSLconfigurationProfile'
      }
    },
    selects: {
      sslConfProfile: {
        id: 'ssl_conf_profile'
      }
    },
    checkboxes: {
      preferServerSideCiphers: {
        id: 'ssl_prefer_server_ciphers'
      },
      oneAtATime: {
        id: 'openOnlyOneRuleAtTime'
      }
    },
    switches: {
      wafProtection: {
        id: 'enable_waf_rules'
      },
      mainAttrs: {
        ariaChecked: 'aria-checked'
      },
      enableEnhancedAnalytics: {
        id: 'enableEnhancedAnalytics'
      },
      lastMileQUICprotocol: {
        id: 'lastMileQUICprotocol'
      },
      blockAllWebCrawlers: {
        id: 'blockAllWebCrawlers'
      },
      RUMdataCollection: {
        id: 'runDataCollection'
      },
      DecompressObjectsFetchedFromTheOrigin: {
        id: 'enableDecompression'
      },
      originHealthMonitoring: {
        id: 'originHealthMonitoring'
      },
      edgeCaching: {
        id: 'edgeCaching'
      },
      overrideOriginCachingHeaders: {
        id: 'overrideOriginCachingHeaders'
      },
      edgeCachingHeadersMissing: {
        id: 'newEdgeTTLifOriginMissing'
      },
      keepOrDropQueryStringParameters: {
        id: 'keepOrDropQueryStringParameters'
      },
      overrideHTTPcookies: {
        css: '.cachingRulesURLblock:first-child .overrideHTTPcookies'
      },

      ignoreAllHTTPcookies: {
        css: '.cachingRulesURLblock:first-child .ignoreAllHTTPcookies'
      },
      keepOrDropSpecificHTTPcookies: {
        id: 'keepOrDropSpecificHTTPcookies'
      },
      removeIgnoredCookiesFromOriginRequests: {
        id: 'removeIgnoredCookiesFromOriginRequests'
      },
      removeIgnoredCookiesFromEdgeResponses: {
        id: 'removeIgnoredCookiesFromEdgeResponses'
      },
      overrideEdgeCaching: {
        css: '.cachingRulesURLblock:first-child .overrideEdgeCaching'
      },
      forceRevalidation: {
        id: 'forceRevalidation'
      },
      enableServingStaleContent: {
        css: '.cachingRulesURLblock:first-child .enableTheServingOfStaleContent'
      },
      staleObjectTTLwhileFetchingNewObject: {
        css: '.cachingRulesURLblock:first-child .staleObjectTTLwhileFetchingNewObject'
      },
      staleObjectTTLwhenOriginIsDown: {
        css: '.cachingRulesURLblock:first-child .staleObjectTTLwhenOriginIsDown'
      },


      enableESI: {
        id: 'enableESI'
      },


      acceptSSLrequests: {
        id: 'acceptSSLrequests'
      },
      wafFunctionalityForTheDomain: {
        id: 'enable_waf_rules'
      },
      aclRulesEnableSw: {
        id: 'enable_acl_rules'
      },
      botProtectionEnableSw: {
        id: 'enable_bot_protection'
      },
      customVCLrules: {
        id: 'customVCLrules'
      },
      dynamicOriginDNSnameLookups: {
        id: 'dynamicOriginDNSnameLookups'
      },
      enableLuaScriptingOnEdgeLastMile: {
        id: 'luaScriptingLastMile'
      },
      enableLuaScriptingOriginFirstMile: {
        id: 'luaScriptingFirstMile'
      },
      enable3rdPartyRewrite: {
        id: 'enable3rdPartyRewrite'
      },
      enable3rdPartyRootRewrite: {
        id: 'enable3rdPartyRootRewrite'
      },
      enable3rdPartyRuntimeRewrite: {
        id: 'enable3rdPartyRuntimeRewrite'
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
      imageEngine: {
        id: 'enableImageEngine'
      },
      refreshImageEngineConfigurationChBox: {
        id: 'refreshImageEngineConfigurationChBox'
      }


    },
    dropDowns: {
      account: {
        id: 'account_id'
      },
      companyName: {
        model: 'model.account_id'
      },
      originServerLocation: {
        id: 'origin_server_location_id'
      },
      sslCert: {
        id: 'ssl_cert_id'
      }
    },

    buttons: {
      addNewCachingRule: {
        id: 'addNewCachingRulesBlock'
      },

      openUrlOfCachingRule: {
        css: '.cachingRulesURLblock:first-child a[title="Expand Caching Rule"]'
      },
      addNewBackendBlock: {
        id: 'addNewBackendBlock'
      },
      btnCopyCname: {
        css: '.btn-copy--cname'
      },
      manageSSLcertificates: {
        id: 'manageSSLcertificates'
      },
      onAddNewItemBP: {
        css: '#luaScriptingLastMileBlock .addNewLuaBlock'
      },
      onAddNewItemCO: {
        css: '#luaScriptingFirstMileBlock .addNewLuaBlock'
      },
      originHealthMonitoringBtn: {
        model: 'model.enable_origin_health_probe'
      }
    },
    elementsForm: {
      elementsLuaScriptsLastMile: {
        css: '#luaScriptingLastMileBlock .elemLastFirstMile'
      },
      elementsLuaScriptsFirstMile: {
        css: '#luaScriptingFirstMileBlock .elemLastFirstMile'
      }
    },
    blocks: {
      customVCLrules: {
        id: 'customVCLrulesBlock'
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
      },

      cachingRulesBlock: {
        id: 'cachingRulesBlock'
      },
      URL: {
        css: '.cachingRulesURLblock:first-child'
      },

      manageOriginRequestHeaders: {
        id: 'manageOriginRequestHeaders'
      },

      manageEndUserResponseHeaders: {
        id: 'manageEndUserResponseHeaders'
      },

      customVCLrulesBlocks: {
        css: '#customVCLrulesBlock .panel-group > .panel-default'
      },

      linkFromListCustomVCLrulesBlocks: {
        css: '#customVCLrulesBlock .panel-default .accordion-toggle'
      },

      backendsBlock: {
        id: 'backendsBlock'
      },

      luaScriptsExecutedEdgeLastFirstMilesProxies: {
        css: '.domain-lua-scripting--list'
      }

    },
    tabs: {
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
      acl: {
        li: '.domain-edit-form .nav.nav-tabs>li:nth-child(5)',
        css: '.domain-edit-form .nav.nav-tabs>li:nth-child(5) a'
      },
      waf: {
        li: '.domain-edit-form .nav.nav-tabs>li:nth-child(6)',
        css: '.domain-edit-form .nav.nav-tabs>li:nth-child(6) a'
      },
      botProtection: {
        li: '.domain-edit-form .nav.nav-tabs>li:nth-child(7)',
        css: '.domain-edit-form .nav.nav-tabs>li:nth-child(7) a'
      },
      customVCLRules: {
        li: '.domain-edit-form .nav.nav-tabs>li:nth-child(8)',
        css: '.domain-edit-form .nav.nav-tabs>li:nth-child(8) a'
      },
      luaScripting: {
        li: '.domain-edit-form .nav.nav-tabs>li:nth-child(9)',
        css: '.domain-edit-form .nav.nav-tabs>li:nth-child(9) a'
      },
      thirdPartyLinks: {
        li: '.domain-edit-form .nav.nav-tabs>li:nth-child(10)',
        css: '.domain-edit-form .nav.nav-tabs>li:nth-child(10) a'
      },
      imageEngine: {
        li: '.domain-edit-form .nav.nav-tabs>li:nth-child(11)',
        css: '.domain-edit-form .nav.nav-tabs>li:nth-child(11) a'
      }
    }
  },



  getOnAddNewCachingRule: function () {
    return element(by.id(this.locators.buttons.addNewCachingRule.id));
  },

  getOnAddNewBackendBlock: function () {
    return element(by.id(this.locators.buttons.addNewBackendBlock.id));
  },

  getBtnCopyCname: function () {
    return element(by.css(this.locators.buttons.btnCopyCname.css));
  },

  getOpenUrlOfCachingRule: function () {
    return element.all(by.css(this.locators.buttons.openUrlOfCachingRule.css));
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
   * ### DomainForm.getACLTab()
   *
   * Returns the reference to the `WAF` tab (Selenium WebDriver
   * Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getACLTab: function () {
    return element(by.css(this.locators.tabs.acl.css));
  },
  /**
   * ### DomainForm.getWAFTab()
   *
   * Returns the reference to the `WAF` tab (Selenium WebDriver
   * Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getWAFTab: function () {
    return element(by.css(this.locators.tabs.waf.css));
  },
  /**
   * ### DomainForm.getBotProtectionTab()
   *
   * Returns the reference to the `WAF` tab (Selenium WebDriver
   * Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getBotProtectionTab: function () {
    return element(by.css(this.locators.tabs.botProtection.css));
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
   * ### DomainForm.getThirdPartyLinksTab()
   *
   * Returns the reference to the `Third-Party Links` tab
   * (Selenium WebDriver Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getThirdPartyLinksTab: function () {
    return element(by.css(this.locators.tabs.thirdPartyLinks.css));
  },

  /**
   * ### DomainForm.getImageEngineTab()
   *
   * Returns the reference to the `ImageEngine` tab
   * (Selenium WebDriver Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getImageEngineTab: function () {
    return element(by.css(this.locators.tabs.imageEngine.css));
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
    return element(by.id(this.locators.dropDowns.account.id));
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
    return element(by.id(this.locators.dropDowns.sslCert.id));
  },

  /**
   * ### DomainForm.getSslCertDDownItems()
   *
   * Returns the reference to the `SSL Certificate` drop-down items (Selenium WebDriver
   * Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getSslCertDDownItems: function () {
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
    return element(by.id(this.locators.textInputs.originServer.id));
  },

  /**
   * ### DomainForm.getOriginHostHeaderTxtIn()
   *
   * Returns the reference to the `Origin Host Header` text field (Selenium
   * WebDriver Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getOriginHostHeaderTxtIn: function () {
    return element(by.id(this.locators.textInputs.originHostHeader.id));
  },

  getBlueTriangleTechKeyTxtIn: function () {
    return element(by.id(this.locators.textInputs.blueTriangleTechKey.id));
  },

  clearBlueTriangleTechKey: function () {
    return this
      .getBlueTriangleTechKeyTxtIn()
      .clear();
  },

  setBlueTriangleTechKey: function (value) {
    return this
      .getBlueTriangleTechKeyTxtIn()
      .sendKeys(value);
  },


  getWildcardDomainAliasTxtIn: function () {
    return element(by.id(this.locators.textInputs.wildcardDomainAlias.id));
  },

  clearWildcardDomainAlias: function () {
    return this
      .getWildcardDomainAliasTxtIn()
      .clear();
  },

  setWildcardDomainAlias: function (value) {
    return this
      .getWildcardDomainAliasTxtIn()
      .sendKeys(value);
  },

  getNonWildcardDomainAliasesTxtIn: function () {
    return element(by.id(this.locators.textInputs.nonWildcardDomainAliases.id));
  },

  getOriginMonitoringHTTPrequestTxtIn: function () {
    return element(by.id(this.locators.textInputs.originMonitoringHTTPrequest.id));
  },

  setOriginMonitoringHTTPrequest: function (value) {
    return this.getOriginMonitoringHTTPrequestTxtIn().sendKeys(value);
  },

  getCacheBypassLocationsTxtIn: function () {
    return element(by.id(this.locators.textInputs.cacheBypassLocations.id));
  },

  getCachingRulesBlock: function () {
    return element(by.id(this.locators.blocks.cachingRulesBlock.id));
  },

  getURLtxtIn: function () {
    return element(by.css(this.locators.blocks.URL.css));
  },

  getQueryStringParametersToDropKeepTxtIn: function () {
    return element(by.id(this.locators.textInputs.queryStringParametersToDropKeep.id));
  },

  getAllowedSSLprotocolsTxtIn: function () {
    return element(by.id(this.locators.textInputs.allowedSSLprotocols.id));
  },

  getAllowedSSLciphersTxtIn: function () {
    return element(by.id(this.locators.textInputs.allowedSSLciphers.id));
  },

  getBackendNameTxtIn: function () {
    return element(by.css(this.locators.textInputs.backendName.css));
  },

  getOriginHostTxtIn: function () {
    return element(by.id(this.locators.textInputs.originHost.id));
  },

  getEnableEnhancedAnalytics: function () {
    return element(by.id(this.locators.switches.enableEnhancedAnalytics.id));
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

  setComment: function (value) {
    return this.getCommentTxtIn().sendKeys(value);
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
    return element(by.id(this.locators.numberInputs.dataReadTimeout.id));
  },

  setDataReadTimeout: function (value) {
    return this.getDataReadTimeoutTxtIn().sendKeys(value);
  },

  getOriginHealthMonitoringBtn: function () {
    return element(by.model(this.locators.buttons.originHealthMonitoringBtn.model));
  },

  clickOriginHealthMonitoringBtn: function () {
    return this
      .getOriginHealthMonitoringBtn()
      .click();
  },
  getProbeTimeoutTxtIn: function () {
    return element(by.id(this.locators.numberInputs.probeTimeout.id));
  },

  setProbeTimeout: function (value) {
    return this
      .getProbeTimeoutTxtIn()
      .clear()
      .sendKeys(value);
  },

  getProbeIntervalTxtIn: function () {
    return element(by.id(this.locators.numberInputs.probeInterval.id));
  },

  setProbeInterval: function (value) {
    return this
      .getProbeIntervalTxtIn()
      .clear()
      .sendKeys(value);
  },

  getExpectedHTTPresponseCodeTxtIn: function () {
    return element(by.id(this.locators.numberInputs.expectedHTTPresponseCode.id));
  },

  setExpectedHTTPresponseCode: function (value) {
    return this
      .getExpectedHTTPresponseCodeTxtIn()
      .clear()
      .sendKeys(value);
  },

  getEdgeCacheTTLTxtIn: function () {
    return element(by.id(this.locators.numberInputs.edgeCacheTTL.id));
  },

  getOriginTCPportTxtIn: function () {
    return element(by.id(this.locators.numberInputs.originTCPport.id));
  },

  getLastMileQUICprotocolTxtIn: function () {
    return element(by.id(this.locators.switches.lastMileQUICprotocol.id));
  },

  getBlockAllWebCrawlersTxtIn: function () {
    return element(by.id(this.locators.switches.blockAllWebCrawlers.id));
  },

  getRUMdataCollectionTxtIn: function () {
    return element(by.id(this.locators.switches.RUMdataCollection.id));
  },
  /**
   * ### DomainForm.getDecompressObjectsFetchedFromTheOriginTxtIn()
   *
   * Returns the reference to the `Decompress Objects Fetched From The Origin`
   * text field (SeleniumWebDriver Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getDecompressObjectsFetchedFromTheOriginTxtIn: function () {
    return element(by.id(this.locators.switches.DecompressObjectsFetchedFromTheOrigin.id));
  },

  getOriginHealthMonitoringTxtIn: function () {
    return element(by.id(this.locators.switches.originHealthMonitoring.id));
  },

  getEdgeCachingTxtIn: function () {
    return element(by.id(this.locators.switches.edgeCaching.id));
  },

  getOverrideOriginCachingHeadersTxtIn: function () {
    return element(by.id(this.locators.switches.overrideOriginCachingHeaders.id));
  },

  getEdgeCachingHeadersMissingTxtIn: function () {
    return element(by.id(this.locators.switches.edgeCachingHeadersMissing.id));
  },

  getKeepOrDropQueryStringParametersTxtIn: function () {
    return element(by.id(this.locators.switches.keepOrDropQueryStringParameters.id));
  },

  getOverrideHTTPcookiesTxtIn: function () {
    return element(by.css(this.locators.switches.overrideHTTPcookies.css));
  },

  getIgnoreAllHTTPcookiesTxtIn: function () {
    return element(by.css(this.locators.switches.ignoreAllHTTPcookies.css));
  },

  getKeepOrDropSpecificHTTPcookiesTxtIn: function () {
    return element(by.id(this.locators.switches.keepOrDropSpecificHTTPcookies.id));
  },
  getListOfCookiesToDrop: function () {
    return element(by.css(this.locators.textInputs.listOfCookiesToDrop.css));
  },

  getRemoveIgnoredCookiesFromOriginRequests: function () {
    return element(by.id(this.locators.switches.removeIgnoredCookiesFromOriginRequests.id));
  },

  getRemoveIgnoredCookiesFromEdgeResponses: function () {
    return element(by.id(this.locators.switches.removeIgnoredCookiesFromEdgeResponses.id));
  },

  getOverrideEdgeCachingTxtIn: function () {
    return element(by.css(this.locators.switches.overrideEdgeCaching.css));
  },

  getBrowserCachingTTL: function () {
    return element(by.id(this.locators.numberInputs.browserCachingTTL.id));
  },

  getForceRevalidation: function () {
    return element(by.id(this.locators.switches.forceRevalidation.id));
  },

  getEnableServingStaleContentTxtIn: function () {
    return element(by.css(this.locators.switches.enableServingStaleContent.css));
  },

  getStaleObjectTTLwhileFetchingNewObject: function () {
    return element(by.css(this.locators.switches.staleObjectTTLwhileFetchingNewObject.css));
  },

  getStaleObjectTTLwhenOriginIsDown: function () {
    return element(by.css(this.locators.switches.staleObjectTTLwhenOriginIsDown.css));
  },

  getEnableESITxtIn: function () {
    return element(by.id(this.locators.switches.enableESI.id));
  },

  getManageOriginRequestHeaders: function () {
    return element(by.id(this.locators.blocks.manageOriginRequestHeaders.id));
  },



  getManageEndUserResponseHeaders: function () {
    return element(by.id(this.locators.blocks.manageEndUserResponseHeaders.id));
  },


  getAcceptSSLrequestsTxtIn: function () {
    return element(by.id(this.locators.switches.acceptSSLrequests.id));
  },
  getWAFFunctionalityForTheDomain: function () {
    return element(by.id(this.locators.switches.wafFunctionalityForTheDomain.id));
  },
  getACLRulesEnableSw: function () {
    return element(by.id(this.locators.switches.aclRulesEnableSw.id));
  },
  getBotProtectionEnableSw: function () {
    return element(by.id(this.locators.switches.botProtectionEnableSw.id));
  },
  getCustomVCLrulesSw: function () {
    return element(by.id(this.locators.switches.customVCLrules.id));
  },
  getDynamicOriginDNSnameLookupsTxtIn: function () {
    return element(by.id(this.locators.switches.dynamicOriginDNSnameLookups.id));
  },
  getEnableLuaScriptingOnEdgeLastMile: function () {
    return element(by.id(this.locators.switches.enableLuaScriptingOnEdgeLastMile.id));
  },
  getEnableLuaScriptingOriginFirstMile: function () {
    return element(by.id(this.locators.switches.enableLuaScriptingOriginFirstMile.id));
  },
  getEnable3rdPartyRewrite: function () {
    return element(by.id(this.locators.switches
      .enable3rdPartyRewrite.id));
  },
  getEnable3rdPartyRootRewrite: function () {
    return element(by.id(this.locators.switches
      .enable3rdPartyRootRewrite.id));
  },
  getEnable3rdPartyRuntimeRewrite: function () {
    return element(by.id(this.locators.switches
      .enable3rdPartyRuntimeRewrite.id));
  },
  getThirdPartyUrlsTxtIn: function () {
    return element(by.id(this.locators.textInputs.thirdPartyUrls.id));
  },
  getThirdPartyRootRewriteDomainsTxtIn: function () {
    return element(by.id(this.locators.textInputs.thirdPartyRootRewriteDomains.id));
  },
  getThirdPartyRuntimeDomainsTxtIn: function () {
    return element(by.id(this.locators.textInputs.thirdPartyRuntimeDomains.id));
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
  /**
  * ### DomainForm.getImageEngineSw()
  *
  * Returns the reference to the `ImageEngine` switch
  * (Selenium WebDriver Element)
  *
  * @returns {Selenium WebDriver Element}
  */
  getImageEngineSw: function () {
    return element(by.id(this.locators.switches.imageEngine.id));
  },
  getImageEngineTokenTxtIn: function () {
    return element(by.id(this.locators.textInputs.imageEngineToken.id));
  },
  getImageEngineTokenValue: function () {
    return this.getImageEngineTokenTxtIn().getAttribute('value');
  },
  getImageEngineAPIKeyTxtIn: function () {
    return element(by.id(this.locators.textInputs.imageEngineAPIKey.id));
  },
  getImageEngineAPIKeyValue: function () {
    return this.getImageEngineAPIKeyTxtIn().getAttribute('value');
  },
  getImageEngineOriginServerTxtIn: function () {
    return element(by.id(this.locators.textInputs.imageEngineOriginServer.id));
  },
  getImageEngineOriginServerValue: function () {
    return this.getImageEngineOriginServerTxtIn().getAttribute('value');
  },
  getSetImageEngineConfigurationSw: function () {
    return element(by.id(this.locators.switches.refreshImageEngineConfigurationChBox.id));
  },
  getUseEndUserProtocolTxtIn: function () {
    return element(by.id(this.locators.radioInputs.useEndUserProtocol.id));
  },
  getHttpsOnlyTxtIn: function () {
    return element(by.id(this.locators.radioInputs.httpsOnly.id));
  },
  getHttpOnlyTxtIn: function () {
    return element(by.id(this.locators.radioInputs.httpOnly.id));
  },


  getPredefinedSSLconfigurationTxtIn: function () {
    return element(by.id(this.locators.radioInputs.predefinedSSLconfigurationProfile.id));
  },
  getCustomSSLconfigurationTxtIn: function () {
    return element(by.id(this.locators.radioInputs.customSSLconfigurationProfile.id));
  },


  getManageSSLcertificatesTxtIn: function () {
    return element(by.id(this.locators.buttons.manageSSLcertificates.id));
  },

  getSslConfProfileTxtIn: function () {
    return element(by.id(this.locators.selects.sslConfProfile.id));
  },

  getPreferServerSideCiphersTxtIn: function () {
    return element(by.id(this.locators.checkboxes.preferServerSideCiphers.id));
  },

  getBlockCustomVCLrulesTxtIn: function () {
    return element(by.id(this.locators.blocks.customVCLrules.id));
  },

  getOneAtATimeTxtIn: function () {
    return element(by.id(this.locators.checkboxes.oneAtATime.id));
  },

  getBackends: function () {
    return element(by.css(this.locators.blocks.backends.css));
  },

  getBackendVCLcode: function () {
    return element(by.id(this.locators.textareas.backendVCLcode.id));
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


  getCustomVCLrulesBlocks: function () {
    return element.all(by.css(this.locators.blocks.customVCLrulesBlocks.css));
  },


  getLinkFromListCustomVCLrulesBlocks: function () {
    return element.all(by.css(this.locators.blocks.linkFromListCustomVCLrulesBlocks.css));
  },


  getCustomVCLrulesListFunctions: function () {
    return element.all(by.css(this.locators.textareas.customVCLrulesListFunctions.css));
  },


  getBackendsBlock: function () {
    return element(by.id(this.locators.blocks.backendsBlock.id));
  },


  getLuaScriptsExecutedEdgeLastFirstMilesProxies: function () {
    return element
      .all(by.css(this.locators.blocks
        .luaScriptsExecutedEdgeLastFirstMilesProxies.css));
  },


  getLuaScriptsExecutedEdgeLastMilefields: function () {
    return element.all(by.css(this.locators.elementsForm.elementsLuaScriptsLastMile.css));
  },

  getLuaScriptsExecutedEdgeFirstMilefields: function () {
    return element.all(by.css(this.locators.elementsForm.elementsLuaScriptsFirstMile.css));
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
      by.id(this.locators.dropDowns.originServerLocation.id));
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
  getSslCert: function () {
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
  setSslCert: function (sslCert) {
    var me = this;
    return this.getSSLConfigurationTab()
      .click().then(function () {
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
  * ### DomainForm.setImageEngineTokenTxtIn()
  *
  * Sets a new value for `ImageEngine Token` text field
  *
  * @param {String} imageEngineTokenValue
  *
  * @returns {Promise}
  */
  setImageEngineTokenTxtIn: function (imageEngineTokenValue) {
    var el = this
      .getImageEngineTokenTxtIn()
      .clear()
      .sendKeys(imageEngineTokenValue);
    return el;
  },
  /**
   * ### DomainForm.setImageEngineAPIKeyTxtIn()
   *
   * Sets a new value for `ImageEngine Purge API Secret Key` text field
   *
   * @param {String} imageEngineAPIKeyValue
   *
   * @returns {Promise}
   */
  setImageEngineAPIKeyTxtIn: function (imageEngineAPIKeyValue) {
    return this
      .getImageEngineAPIKeyTxtIn()
      .clear()
      .sendKeys(imageEngineAPIKeyValue);
  },
  /**
  * ### DomainForm.setImageEngineAPIKeyTxtIn()
  *
  * Sets a new value for `Origin Server` text field
  *
  * @param {String} ImageEngineTokenTxtIn
  *
  * @returns {Promise}
  */
  setImageEngineOriginServerTxtIn: function (imageEngineOriginServerValue) {
    return this
      .getImageEngineOriginServerTxtIn()
      .clear()
      .sendKeys(imageEngineOriginServerValue);
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
    * ### DomainForm.clearInputsImageEngineForm()
    *
    * Clean the Domain Config ImageEngine Form inputs elemenst in the UI.
    *
    * @returns {Promise}
    */
  clearInputsImageEngineForm: function () {
    this
      .getImageEngineTokenTxtIn()
      .clear();
    this
      .getImageEngineAPIKeyTxtIn()
      .clear();
    return this
      .getImageEngineOriginServerTxtIn()
      .clear();
  },
  /**
   * ### DomainForm.clickImageEngine()
   *
   * Triggers a click on the `ImageEngine` switch from the Edit Domain page
   * from the Portal app.
   *
   * @returns {Promise}
   */
  clickImageEngine: function () {
    this
      .getImageEngineSw()
      .click();
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
  },

  getWAFSwitch: function () {
    return element(by.id(this.locators.switches.wafProtection.id));
  },

  clickWAFSwitch: function () {
    return this.getWAFSwitch().click();
  },

  setAllowedSSLProtocols: function (value) {
    this.getAllowedSSLprotocolsTxtIn().clear();
    return this.getAllowedSSLprotocolsTxtIn().sendKeys(value);
  },

  setAllowedSSLCiphers: function (value) {
    this.getAllowedSSLciphersTxtIn().clear();
    return this.getAllowedSSLciphersTxtIn().sendKeys(value);
  },

  getWAFLocationTxtIn: function () {
    return element(by.model(this.locators.textInputs.wafLocation.model));
  },

  setWAFLocation: function (value) {
    this.getWAFLocationTxtIn().clear();
    return this.getWAFLocationTxtIn().sendKeys(value);
  },

  getBotLocationTxtIn: function () {
    return element(by.model(this.locators.textInputs.botLocation.model));
  },

  getBotCallTypeTxtIn: function () {
    return element(by.model(this.locators.textInputs.botCallType.model));
  },

  getBotProtectionID: function () {
    return element(by.model(this.locators.textInputs.botProtectionID.model));
  },

  setBotLocation: function (value) {
    this.getBotLocationTxtIn().clear();
    return this.getBotLocationTxtIn().sendKeys(value);
  },

  setBotCallType: function (value) {
    this.getBotCallTypeTxtIn().clear();
    return this.getBotCallTypeTxtIn().sendKeys(value);
  },

  setBotProtectionID: function (value) {
    this.getBotProtectionID().clear();
    return this.getBotProtectionID().sendKeys(value);
  }
};

module.exports = DomainForm;
