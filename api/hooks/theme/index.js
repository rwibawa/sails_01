/**
 * theme hook - Sets the correct CSS to be displayed
 */

module.exports = function (sails) {
  return {
    routes: {
      before: {
        'all /*': function (req, res, next) {
          if (!req.isSocket) {
            // makes theme variable available in views
            res.locals.theme = sails.hooks.theme.getTheme(req);
          }
          return next();
        }
      }
    },

    /**
     * getTheme defines which css needs to be used for this request
     * In this case, we select the theme by pattern matching certain words from the hostname
     */
    getTheme: function (req) {
      var hostname = 'default';
      var theme = 'default';
      try {
        hostname = req.get('host').toLowerCase();
      } catch(e) {
        // host may not be available always (ie, socket calls. If you need that, add a Host header in your
        // sails socket configuration)
      }

      // if burrito is found on the hostname, change the theme
      if (hostname.indexOf('sleepy') > -1) {
        theme = 'burrito';
      }

      return theme;
    }
  };
};
