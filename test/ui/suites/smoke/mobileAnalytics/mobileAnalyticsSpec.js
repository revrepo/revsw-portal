var config = require('config');
var Portal = require('./../../../page_objects/portal');

describe('Smoke', function () {
	describe('Mobile Analytics', function () {
		
	var user = config.get('portal.users.admin');
		  
	beforeAll(function () {
		Portal.signIn(user);
	});

	afterAll(function () {
		Portal.signOut();
	});
	/*
	it('should display Traffic Levels page',
  	  function () {
		var pageTitle = 'Traffic Levels';
		Portal.helpers.nav.goToMATrafficLevels();
		expect(Portal.mobileAnalytics.trafficLevelsPage
		  .getTitle())
		  .toEqual(pageTitle);
	});
	
	it('should display Top Reports page',
	  function () {
		var pageTitle = 'Mobile Top Reports';
		Portal.helpers.nav.goToMATopReports();
		expect(Portal.mobileAnalytics.topReportsPage
		  .getTitle())
		  .toEqual(pageTitle);
	});
	
	it('should display Top Objects page',
	  function () {
		var pageTitle = 'Top Objects Reports';
		Portal.helpers.nav.goToMATopObjects();
		expect(Portal.mobileAnalytics.topObjectsPage
		  .getTitle())
		  .toEqual(pageTitle);
	});
	
	it('should display Top Objects page',
	  function () {
		var pageTitle = 'Mobile Traffic Distributions';
		Portal.helpers.nav.goToMATrafficDistributions();
		expect(Portal.mobileAnalytics.trafficDistributions
		  .getTitle())
		  .toEqual(pageTitle);
	});
	
	it('should display Company Name selector', 
	  function () {
		Portal.helpers.nav.goToMATrafficLevels();
		expect(Portal.mobileAnalytics.trafficLevelsPage
		  .getCompanyNameDDown()
		  .isDisplayed())
		  .toBeTruthy();
	});
	
	it('should display selectors(filters) of charts', 
	  function () {
		Portal.helpers.nav.goToMATrafficLevels();
		Portal.mobileAnalytics.trafficLevelsPage
		  .getFilters()
		  .then(function (filters) {
		     for(var index = 0; index < filters.length; index++) {
				expect(filters[index]
				  .isDisplayed())
				  .toBeTruthy();
			}
		});
	});
	
	it('should btn Update Report be enabled after selecting Filters and' +
       'selecting Company Name', 
	  function () {
		var companyName = 'qa';
		Portal.helpers.nav.goToMATrafficLevels();
		Portal.mobileAnalytics.trafficLevelsPage.selectFilterDay();
		Portal.mobileAnalytics.trafficLevelsPage.selectFilterNetwork();
		Portal.mobileAnalytics.trafficLevelsPage.selectCompanyName(companyName);
		expect(Portal.mobileAnalytics.trafficLevelsPage
		  .getUpdateReportBtn()
		  .isEnabled())
		  .toBeTruthy();
	});
	
	it('should display options(PNG,JPEG,XLS...) of Chart Context Menu', 
	  function () {
		Portal.helpers.nav.goToMATrafficLevels();
		Portal.mobileAnalytics.trafficLevelsPage
		  .getChartContextMenuBtn()
		  .click();
		browser.actions().mouseMove(Portal.mobileAnalytics.trafficLevelsPage
		  .getChartContextMenuBtn());
		expect(Portal.mobileAnalytics.trafficLevelsPage
		  .getChartContextMenu()
		  .isDisplayed())
		  .toBeTruthy();
		Portal.mobileAnalytics.trafficLevelsPage
		  .getChartContextMenu()
		  .then( function (options) {
			for(var index = 0; index < options.length; index++) {
				expect(options[index]
				  .isDisplayed())
				  .toBeTruthy();
			}
     //	if you want to check text of the options use:
     //	  expect(options[1].getText()).toEqual('Download PNG image');
		  });
	});
	
	it('should display tabs and their names at Top Objects page', 
	  function () {
		Portal.helpers.nav.goToMATopObjects();
     // expecting that tabs are displayed
		expect(Portal.mobileAnalytics.topObjectsPage
		  .getTopTabs()
		  .isDisplayed())
		  .toBeTruthy();
		Portal.mobileAnalytics.topObjectsPage
		  .getTopTabs()
		  .then( function (tabs) {
		    for(var index = 0; index < tabs.length; index++) {
				expect(tabs[index]
				  .isDisplayed())
				  .toBeTruthy();
			}
		   });  
     // expecting that tabs' names are correct
		Portal.mobileAnalytics.topObjectsPage
		  .getTopTabs()
		  .getText()
		  .then( function (tabsNames) {
		    expect(tabsNames[0])
			  .toEqual('Top Most Requested Objects');
			expect(tabsNames[1])
			  .toEqual('Top Objects With Slowest Response Time');
			expect(tabsNames[2])
			  .toEqual('Top Objects With Slowest First Byte Time');
			expect(tabsNames[3])
			  .toEqual('Top Objects With 404 Responses');
			expect(tabsNames[4])
			  .toEqual('Top Objects With Cache Misses');
			expect(tabsNames[5])
			  .toEqual('Top Objects With Completion Failures');
			expect(tabsNames[6])
			  .toEqual('Top Objects With 5XX Error Codes');
		   });
	});
	*/
	it('should display tab "Top Objects With 5XX Error Codes"' +
	  'at Top Objects page', 
	  function () {
		Portal.helpers.nav.goToMATopObjects();
		Portal.mobileAnalytics.topObjectsPage
		  .clickTabTopObjectsWith5XXErrorCodes();  
		expect(Portal.mobileAnalytics.topObjectsPage
		  .getTopTabsHeaderText())
		  .toEqual('Top Objects With 5XX Error Codes');
	});
	
	});
});