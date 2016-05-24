(function() {
  'use strict';
  /**
   * Directive 'time-note-display' for show Constan Message about time used for display different information
   */
  angular
    .module('revapm.Portal.Shared')
    .directive('timeNoteDisplay', timeNoteDisplayDirective);

  /*@ngInject*/
  function timeNoteDisplayDirective($config) {
    return {
      restrict: 'E',
      replace: true,
      template: '<span class="time-note-display"><small>'+$config.TIME_NOTE_DISPLAY.MESSAGE+'</small></span>'
    };
  }
})();
