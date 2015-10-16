###*
 * Promised Event Emitter
 * @link      http://github.com/dragoscirjan/nodejs-config for the canonical source repository
 * @link      https://github.com/dragoscirjan/nodejs-config/issues for issues and support
 * @license   https://github.com/dragoscirjan/nodejs-config/blob/master/LICENSE MIT
###

_extend = require 'extend'

###*
 * @var {Log}
 * @link https://www.npmjs.com/package/log
###
Log = require 'log'

###*
 * Common Class, used for different small operations such as shell commands,
 * extending objects, etc.
 *
 * @link http://misc.flogisoft.com/bash/tip_colors_and_formatting for colors
###
class Logger

    @colors: {
        'BoldBright': '\x1b[1m'
        'Dim': '\x1b[2m'
        'Underlined': '\x1b[4m'
        'Blink': '\x1b[5m'
        'Reverse ': '\x1b[7m' #(invert the foreground and background colors)
        'Hidden ': '\x1b[8m'  # (usefull for passwords)

        'Reset': '\x1b[0m'
        'ResetBoldBright': '\x1b[21m'
        'ResetDim': '\x1b[22m'
        'ResetUnderlined': '\x1b[24m'
        'ResetBlink': '\x1b[25m'
        'ResetReverse': '\x1b[27m'
        'ResetHidden': '\x1b[28m'

        'Default': '\x1b[39m'
        'Black': '\x1b[30m'
        'Red': '\x1b[31m'
        'Green': '\x1b[32m'
        'Yellow': '\x1b[33m'
        'Blue': '\x1b[34m'
        'Magenta': '\x1b[35m'
        'Cyan': '\x1b[36m'
        'LightGray': '\x1b[37m'
        'DarkGray': '\x1b[90m'
        'LightRed': '\x1b[91m'
        'LightGreen': '\x1b[92m'
        'LightYellow': '\x1b[93m'
        'LightBlue': '\x1b[94m'
        'LightMagenta': '\x1b[95m'
        'LightCyan': '\x1b[96m'
        'White': '\x1b[97m'

        'BgDefault': '\x1b[49m'
        'BgBlack': '\x1b[40m'
        'BgRed': '\x1b[41m'
        'BgGreen': '\x1b[42m'
        'BgYellow': '\x1b[43m'
        'BgBlue': '\x1b[44m'
        'BgMagenta': '\x1b[45m'
        'BgCyan': '\x1b[46m'
        'BgLightGray': '\x1b[47m'
        'BgDarkGray': '\x1b[100m'
        'BgLightRed': '\x1b[101m'
        'BgLightRreen': '\x1b[102m'
        'BgLightYellow': '\x1b[103m'
        'BgLightBlue': '\x1b[104m'
        'BgLightMagenta': '\x1b[105m'
        'BgLightCyan': '\x1b[106m'
        'BgWhite': '\x1b[107m'
    }

    @marks: [
        @colors.Yellow + @colors.BgRed + '!!> ',    # EMERGENCY
        @colors.White + @colors.BgRed + ' !> ',     # ALERT
        @colors.White + @colors.BgYellow + '  > ',  # CRITICAL
        @colors.Red + '  > ',                       # ERROR
        @colors.Yellow + '  > ',                    # WARNING
        @colors.LightBlue + '  > ',                 # NOTICE
        @colors.LightGreen + '  > ',                # INFO
        @colors.Default + '    '                    # DEBUG
    ]

    ###*
     *
     *
    ###
    constructor: (level, stream = '/var/log/jupiter/jupiter.log') ->
        if typeof stream == 'string'
            stream = (require 'fs').createWriteStream stream
        @mlog = new Log level, stream
        null

    ###*
     * Log critical `msg`.
     * @see Log::log()
     *
     * @param   {String} msg
    ###
    log: (levelStr, args) ->
        if typeof args == 'string'
            args = [args]
        level = Log[levelStr.toUpperCase()] || 0
        if (level <= @mlog.level)
            a = []
            for i in [0 .. args.length - 1]
                a[i] = if typeof args[i] != 'string' then JSON.stringify(args[i]) else args[i]
                a[i] = Logger.marks[level] + a[i].split("\n").join("\n#{Logger.marks[level]}") + Logger.colors.Default + Logger.colors.BgDefault
            console.log.apply null, a
        @mlog.log levelStr, args
        null

    ###*
     * Log emergency `msg`.
     * @see Log::emergency()
     *
     * @param {String} msg
    ###
    emergency: (msg) ->
        @log('EMERGENCY', arguments)

    ###*
     * Log alert `msg`.
     * @see Log::alert()
     *
     * @param {String} msg
    ###
    alert: (msg) ->
        @log('ALERT', arguments)

    ###*
     * Log critical `msg`.
     * @see Log::critical()
     *
     * @param {String} msg
    ###
    critical: (msg) ->
        @log('CRITICAL', arguments)

    ###*
     * Log error `msg`.
     * @see Log::error()
     *
     * @param {String} msg
    ###
    error: (msg) ->
        @log('ERROR', arguments)

    ###*
     * Log warning `msg`.
     * @see Log::warning()
     *
     * @param {String} msg
    ###
    warning: (msg) ->
        @log('WARNING', arguments)

    ###*
     * Log notice `msg`.
     * @see Log::notice()
     *
     * @param {String} msg
     * @api public
    ###
    notice: (msg) ->
        @log('NOTICE', arguments)


    ###*
     * Log info `msg`.
     * @see Log::info()
     *
     * @param {String} msg
    ###
    info: (msg) ->
        @log('INFO', arguments)

    ###*
     * Log debug `msg`.
     * @see Log::debug()
     *
     * @param {String} msg
    ###
    debug: (msg) ->
        @log('DEBUG', arguments)

###*
 * @var {Function/Logger}
###
module.exports = Logger
