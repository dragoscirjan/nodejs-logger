
/**
 * Promised Event Emitter
 * @link      http://github.com/dragoscirjan/nodejs-config for the canonical source repository
 * @link      https://github.com/dragoscirjan/nodejs-config/issues for issues and support
 * @license   https://github.com/dragoscirjan/nodejs-config/blob/master/LICENSE MIT
 */

(function() {
  var Log, Logger, _extend;

  _extend = require('extend');


  /**
   * @var {Log}
   * @link https://www.npmjs.com/package/log
   */

  Log = require('log');


  /**
   * Common Class, used for different small operations such as shell commands,
   * extending objects, etc.
   *
   * @link http://misc.flogisoft.com/bash/tip_colors_and_formatting for colors
   */

  Logger = (function() {
    Logger.colors = {
      'BoldBright': '\x1b[1m',
      'Dim': '\x1b[2m',
      'Underlined': '\x1b[4m',
      'Blink': '\x1b[5m',
      'Reverse ': '\x1b[7m',
      'Hidden ': '\x1b[8m',
      'Reset': '\x1b[0m',
      'ResetBoldBright': '\x1b[21m',
      'ResetDim': '\x1b[22m',
      'ResetUnderlined': '\x1b[24m',
      'ResetBlink': '\x1b[25m',
      'ResetReverse': '\x1b[27m',
      'ResetHidden': '\x1b[28m',
      'Default': '\x1b[39m',
      'Black': '\x1b[30m',
      'Red': '\x1b[31m',
      'Green': '\x1b[32m',
      'Yellow': '\x1b[33m',
      'Blue': '\x1b[34m',
      'Magenta': '\x1b[35m',
      'Cyan': '\x1b[36m',
      'LightGray': '\x1b[37m',
      'DarkGray': '\x1b[90m',
      'LightRed': '\x1b[91m',
      'LightGreen': '\x1b[92m',
      'LightYellow': '\x1b[93m',
      'LightBlue': '\x1b[94m',
      'LightMagenta': '\x1b[95m',
      'LightCyan': '\x1b[96m',
      'White': '\x1b[97m',
      'BgDefault': '\x1b[49m',
      'BgBlack': '\x1b[40m',
      'BgRed': '\x1b[41m',
      'BgGreen': '\x1b[42m',
      'BgYellow': '\x1b[43m',
      'BgBlue': '\x1b[44m',
      'BgMagenta': '\x1b[45m',
      'BgCyan': '\x1b[46m',
      'BgLightGray': '\x1b[47m',
      'BgDarkGray': '\x1b[100m',
      'BgLightRed': '\x1b[101m',
      'BgLightRreen': '\x1b[102m',
      'BgLightYellow': '\x1b[103m',
      'BgLightBlue': '\x1b[104m',
      'BgLightMagenta': '\x1b[105m',
      'BgLightCyan': '\x1b[106m',
      'BgWhite': '\x1b[107m'
    };

    Logger.marks = [Logger.colors.Yellow + Logger.colors.BgRed + '!!> ', Logger.colors.White + Logger.colors.BgRed + ' !> ', Logger.colors.White + Logger.colors.BgYellow + '  > ', Logger.colors.Red + '  > ', Logger.colors.Yellow + '  > ', Logger.colors.LightBlue + '  > ', Logger.colors.LightGreen + '  > ', Logger.colors.Default + '    '];


    /**
     *
     *
     */

    function Logger(level, stream) {
      if (stream == null) {
        stream = '/var/log/jupiter/jupiter.log';
      }
      if (typeof stream === 'string') {
        stream = (require('fs')).createWriteStream(stream);
      }
      this.mlog = new Log(level, stream);
      null;
    }


    /**
     * Log critical `msg`.
     * @see Log::log()
     *
     * @param   {String} msg
     */

    Logger.prototype.log = function(levelStr, args) {
      var a, i, j, level, ref;
      if (typeof args === 'string') {
        args = [args];
      }
      level = Log[levelStr.toUpperCase()] || 0;
      if (level <= this.mlog.level) {
        a = [];
        for (i = j = 0, ref = args.length - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
          a[i] = typeof args[i] !== 'string' ? JSON.stringify(args[i]) : args[i];
          a[i] = Logger.marks[level] + a[i].split("\n").join("\n" + Logger.marks[level]) + Logger.colors.Default + Logger.colors.BgDefault;
        }
        console.log.apply(null, a);
      }
      this.mlog.log(levelStr, args);
      return null;
    };


    /**
     * Log emergency `msg`.
     * @see Log::emergency()
     *
     * @param {String} msg
     */

    Logger.prototype.emergency = function(msg) {
      return this.log('EMERGENCY', arguments);
    };


    /**
     * Log alert `msg`.
     * @see Log::alert()
     *
     * @param {String} msg
     */

    Logger.prototype.alert = function(msg) {
      return this.log('ALERT', arguments);
    };


    /**
     * Log critical `msg`.
     * @see Log::critical()
     *
     * @param {String} msg
     */

    Logger.prototype.critical = function(msg) {
      return this.log('CRITICAL', arguments);
    };


    /**
     * Log error `msg`.
     * @see Log::error()
     *
     * @param {String} msg
     */

    Logger.prototype.error = function(msg) {
      return this.log('ERROR', arguments);
    };


    /**
     * Log warning `msg`.
     * @see Log::warning()
     *
     * @param {String} msg
     */

    Logger.prototype.warning = function(msg) {
      return this.log('WARNING', arguments);
    };


    /**
     * Log notice `msg`.
     * @see Log::notice()
     *
     * @param {String} msg
     * @api public
     */

    Logger.prototype.notice = function(msg) {
      return this.log('NOTICE', arguments);
    };


    /**
     * Log info `msg`.
     * @see Log::info()
     *
     * @param {String} msg
     */

    Logger.prototype.info = function(msg) {
      return this.log('INFO', arguments);
    };


    /**
     * Log debug `msg`.
     * @see Log::debug()
     *
     * @param {String} msg
     */

    Logger.prototype.debug = function(msg) {
      return this.log('DEBUG', arguments);
    };

    return Logger;

  })();


  /**
   * @var {Function/Logger}
   */

  module.exports = Logger;

}).call(this);
