(function() {
  'use strict';
  /**
   * @ngdoc object
   * @name revapm.dashboardProvider
   * @description
   *
   * The dashboardProvider can be used to register structures and widgets.
   */
  angular
    .module('revapm.Portal.Dashboard')
    .provider('dashboard', function() {
      var widgets = {};
      var widgetsPath = '';
      var structures = {};

      // default apply function of widget.edit.apply
      var defaultApplyFunction = function() {
        return true;
      };
      /**
       * @ngdoc method
       * @name revapm.dashboardProvider#widget
       * @methodOf revapm.dashboardProvider
       * @description
       *
       * Registers a new widget.
       *
       * @param {string} name of the widget
       * @param {object} widget to be registered.
       *     *   Object properties:
       *
       *   - `title` - `{string=}` - The title of the widget.
       *   - `description` - `{string=}` - Description of the widget.
       *   - `collapsed` - `{boolean=}` - true if the widget should be in collapsed state. Default is false.
       *   - `config` - `{object}` - Predefined widget configuration.
       *   - `controller` - `{string=|function()=}` - Controller fn that should be
       *      associated with newly created scope of the widget or the name of a
       *      {@link http://docs.angularjs.org/api/angular.Module#controller registered controller}
       *      if passed as a string.
       *   - `controllerAs` - `{string=}` - A controller alias name. If present the controller will be
       *      published to scope under the `controllerAs` name.
       *   - `frameless` - `{boolean=}` - false if the widget should be shown in frameless mode. The default is false.
       *   - `styleClass` - `{object}` - space delimited string or map of classes bound to the widget.
       *   - `template` - `{string=|function()=}` - html template as a string.
       *   - `templateUrl` - `{string=}` - path to an html template.
       *   - `reload` - `{boolean=}` - true if the widget could be reloaded. The default is false.
       *   - `resolve` - `{Object.<string, function>=}` - An optional map of dependencies which should
       *      be injected into the controller. If any of these dependencies are promises, the widget
       *      will wait for them all to be resolved or one to be rejected before the controller is
       *      instantiated.
       *      If all the promises are resolved successfully, the values of the resolved promises are
       *      injected.
       *
       *      The map object is:
       *      - `key` – `{string}`: a name of a dependency to be injected into the controller.
       *      - `factory` - `{string|function}`: If `string` then it is an alias for a service.
       *        Otherwise if function, then it is {@link http://docs.angularjs.org/api/AUTO.$injector#invoke injected}
       *        and the return value is treated as the dependency. If the result is a promise, it is
       *        resolved before its value is injected into the controller.
       *   - `edit` - `{object}` - Edit modus of the widget.
       *      - `controller` - `{string=|function()=}` - Same as above, but for the edit mode of the widget.
       *      - `controllerAs` - `{string=}` - Same as above, but for the edit mode of the widget.
       *      - `template` - `{string=|function()=}` - Same as above, but for the edit mode of the widget.
       *      - `templateUrl` - `{string=}` - Same as above, but for the edit mode of the widget.
       *      - `resolve` - `{Object.<string, function>=}` - Same as above, but for the edit mode of the widget.
       *      - `reload` - {boolean} - true if the widget should be reloaded, after the edit mode is closed.
       *        Default is true.
       *      - `immediate` - {boolean} - The widget enters the edit mode immediately after creation. Default is false.
       *      - `apply` - `{function()=}` - The apply function is called, before the widget is saved.
       *        The function have to return a boolean or an promise which can be resolved to a boolean.
       *        The function can use injection.
       */
      this.widget = function(name, widget) {
        var w = angular.extend({
          reload: false,
          frameless: false
        }, widget);
        if (w.edit) {
          var edit = {
            reload: true,
            immediate: false,
            apply: defaultApplyFunction
          };
          angular.extend(edit, w.edit);
          w.edit = edit;
        }
        widgets[name] = w;
        return this;
      };

      /**
       * @ngdoc method
       * @name revapm.dashboardProvider#widgetsPath
       * @methodOf revapm.dashboardProvider
       * @description
       *
       * Sets the path to the directory which contains the widgets. The widgets
       * path is used for widgets with a templateUrl which contains the
       * placeholder {widgetsPath}. The placeholder is replaced with the
       * configured value, before the template is loaded, but the template is
       * cached with the unmodified templateUrl (e.g.: {widgetPath}/src/widgets).
       * The default value of widgetPaths is ''.
       *
       *
       * @param {string} path to the directory which contains the widgets
       *
       * @returns {Object} self
       */
      this.widgetsPath = function(path) {
        widgetsPath = path;
        return this;
      };
      /**
       * @ngdoc method
       * @name revapm.dashboardProvider#structure
       * @methodOf revapm.dashboardProvider
       * @description
       *
       * Registers a new structure.
       *
       * @param {string} name of the structure
       * @param {object} structure to be registered.
       *
       *   Object properties:
       *
       *   - `rows` - `{Array.<Object>}` - Rows of the dashboard structure.
       *     - `styleClass` - `{string}` - CSS Class of the row.
       *     - `columns` - `{Array.<Object>}` - Columns of the row.
       *       - `styleClass` - `{string}` - CSS Class of the column.
       *
       * @returns {Object} self
       */
      this.structure = function(name, structure) {
        structures[name] = structure;
        return this;
      };
      /**
       * @ngdoc method
       * @name revapm.dashboardProvider#messageTemplate
       * @methodOf revapm.dashboardProvider
       * @description
       *
       * Changes the template for messages.
       *
       * @param {string} template for messages.
       *
       * @returns {Object} self
       */
      this.messageTemplate = function(template) {
        messageTemplate = template;
        return this;
      };

      /**
       * @ngdoc method
       * @name revapm.dashboardProvider#loadingTemplate
       * @methodOf revapm.dashboardProvider
       * @description
       *
       * Changes the template which is displayed as
       * long as the widget resources are not resolved.
       *
       * @param {string} template loading template
       *
       * @returns {Object} self
       */
      this.loadingTemplate = function(template) {
        loadingTemplate = template;
        return this;
      };



      /**
       * @ngdoc service
       * @name revapm.dashboard
       * @description
       *
       * The dashboard holds all options, structures and widgets.
       *
       * @property {Array.<Object>} widgets Array of registered widgets.
       * @property {string} widgetsPath Default path for widgets.
       * @property {Array.<Object>} structures Array of registered structures.
       * @property {string} messageTemplate Template for messages.
       * @property {string} loadingTemplate Template for widget loading.
       *
       * @returns {Object} self
       */
      this.$get = function() {
        var cid = 0;

        return {
          widgets: widgets,
          widgetsPath: widgetsPath,
          structures: structures,
          messageTemplate: messageTemplate,
          loadingTemplate: loadingTemplate,

          /**
           * @ngdoc method
           * @name adf.dashboard#id
           * @methodOf adf.dashboard
           * @description
           *
           * Creates an ongoing numeric id. The method is used to create ids for
           * columns and widgets in the dashboard.
           */
          id: function() {
            return new Date().getTime() + '-' + (++cid);
          },

          /**
           * @ngdoc method
           * @name adf.dashboard#idEqual
           * @methodOf adf.dashboard
           * @description
           *
           * Checks if the given ids are equal.
           *
           * @param {string} id widget or column id
           * @param {string} other widget or column id
           */
          idEquals: function(id, other) {
            // use toString, because old ids are numbers
            return ((id) && (other)) && (id.toString() === other.toString());
          }
        }
      };

    });
});
