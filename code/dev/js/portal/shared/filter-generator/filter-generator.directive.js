/* filter-generator.directive.js */

/** 
 * 
 * @module 'revapm.Portal.Shared'
 * @desc filter generator
 * @example <filter-generator></filter-generator>
 */
(function(angular) {
	'use strict';

	angular
		.module('revapm.Portal.Shared')
		.directive('filterGenerator', filterGenerator);

	filterGenerator.$inject = [];

	function filterGenerator() {
		var directive = {
			restrict: 'E',
			scope: {},
			templateUrl: 'parts/shared/filter-generator/filter-generator.html',
			//controller: '',
			link: link
		};

		return directive;
	}

	/**
	 * @name link
	 * @desc link function for directive
	 * @kind function
	 */
	function link(scope, elem, attr) {

	}
})(angular);