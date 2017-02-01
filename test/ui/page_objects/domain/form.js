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
      } ,
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
      mainAttrs: {
        ariaChecked: 'aria-checked'
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
        id:'keepOrDropQueryStringParameters'
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
      customVCLrules: {
        css: 'div[ng-model="model.rev_component_bp.custom_vcl.enabled"]'
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
      onAddNewCachingRule: {
        id: 'addNewBackendBlock'
      },

      openUrlOfCachingRule: {
        css: '.cachingRulesURLblock:first-child a[title="Expand Caching Rule"]'
      },
      onAddNewBackendBlock: {
        css: '[title="Add New Backend Block"]'
      },
      btnCopyCname: {
        css: '.btn-copy--cname'
      },
      manageSSLcertificates: {
        id: 'manageSSLcertificates'
      },
      onAddNewItemBP: {
        css: '.addNewLuaBlock'
      },
      onAddNewItemCO: {
        css: '[ng-click="$ctrl.onAddNewItemCO()"]'
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
    return element(by.id(this.locators.buttons.onAddNewCachingRule.id));
  },
  getOnAddNewBackendBlock: function () {
    return element(by.css(this.locators.buttons.onAddNewBackendBlock.css));
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
    return element(by.id(this.locators.textInputs.originServer.id));
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
    return element(by.id(this.locators.textInputs.originHostHeader.id));
  },

  getBlueTriangleTechKeyTxtIn: function () {
    return element(by.id(this.locators.textInputs.blueTriangleTechKey.id));
  },

  getWildcardDomainAliasTxtIn: function () {
    return element(by.id(this.locators.textInputs.wildcardDomainAlias.id));
  },

  getNonWildcardDomainAliasesTxtIn: function () {
    return element(by.id(this.locators.textInputs.nonWildcardDomainAliases.id));
  },

  getOriginMonitoringHTTPrequestTxtIn: function () {
    return element(by.id(this.locators.textInputs.originMonitoringHTTPrequest.id));
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
    return element(by.id(this.locators.numberInputs.dataReadTimeout.id));
  },
  getProbeTimeoutTxtIn: function () {
    return element(by.id(this.locators.numberInputs.probeTimeout.id));
  },

  getProbeIntervalTxtIn: function () {
    return element(by.id(this.locators.numberInputs.probeInterval.id));
  },

  getExpectedHTTPresponseCodeTxtIn: function () {
    return element(by.id(this.locators.numberInputs.expectedHTTPresponseCode.id));
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
  getCustomVCLrulesTxtIn: function () {
    return element(by.css(this.locators.switches.customVCLrules.css));
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
    return element.all(by.css(this.locators.buttons.onAddNewItemBP.css));
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
