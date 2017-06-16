// @see https://datatables.net/plug-ins/sorting/datetime-moment
// or @see https://datatables.net/plug-ins/sorting/date-eu

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery', 'moment', 'datatables.net'], factory);
  } else {
    factory(jQuery, moment);
  }
}(function ($, moment) {

  $.fn.dataTable.moment = function (format, locale) {
    var types = $.fn.dataTable.ext.type;

    // Add type detection
    types.detect.unshift(function (d) {
      if (d) {
        // Strip HTML tags and newline characters if possible
        if (d.replace) {
          d = d.replace(/(<.*?>)|(\r?\n|\r)/g, '');
        }

        // Strip out surrounding white space
        d = $.trim(d);
      }

      // Null and empty values are acceptable
      if (d === '' || d === null) {

        return 'moment-' + format;
      }

      return moment(d, format, locale, true).isValid() ?
        'moment-' + format :
        null;
    });

    // Add sorting method - use an integer for the sorting
    types.order['moment-' + format + '-pre'] = function (d) {
      if (d) {
        // Strip HTML tags and newline characters if possible
        if (d.replace) {
          d = d.replace(/(<.*?>)|(\r?\n|\r)/g, '');
        }

        // Strip out surrounding white space
        d = $.trim(d);
      }
      return d === '' || d === null ?
        -Infinity :
        parseInt(moment(d, format, locale, true).format('x'), 10);
    };
  };
  //NOTE: !!!Attention: AngularJS date mask is not equal momentjs format!!!
  // https://momentjs.com/docs/#/parsing/string-format/
  // https://docs.angularjs.org/api/ng/filter/date
  $.fn.dataTable.moment('MM/DD/YYYY HH:mm a');
  $.fn.dataTable.moment('DD/MM/YYYY HH:mm a');
}));
//
jQuery.extend(jQuery.fn.dataTableExt.oSort, {
  'date-pre': function (a) {
    if (a) {
      // Strip HTML tags and newline characters if possible
      if (a.replace) {
        a = a.replace(/(<.*?>)|(\r?\n|\r)/g, '');
      }
      // Strip out surrounding white space
      a = $.trim(a);
    }
    return moment(a);
  },

  'date-asc': function (a, b) {
    if (moment(a).isValid() && moment(b).isValid()) {
      if (a.isBefore(b)) {
        return -1;
      } else if (b.isBefore(a)) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  },

  'date-desc': function (a, b) {
    if (moment(a).isValid() && moment(b).isValid()) {
      if (a.isBefore(b)) {
        return 1;
      } else if (b.isBefore(a)) {
        return -1;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }
});
