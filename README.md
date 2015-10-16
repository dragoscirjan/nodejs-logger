# NodeJS Logger

Tool for logging (with colors)

# Examples

## New Logger

```javascript
var Logger = require('logger');
var logger = new Logger('INFO', '/var/log/logger.log');
```
## Log levels

```javascript
logger.log('DEBUG', 'This is a debug message');
logger.debug('This is a debug message');

logger.log('INFO', 'This is a info message');
logger.info('This is a info message');

logger.log('NOTICE', 'This is a notice message');
logger.notice('This is a notice message');

logger.log('WARNING', 'This is a warning message');
logger.warning('This is a warning message');

logger.log('ERROR', 'This is a error message');
logger.error('This is a error message');

logger.log('CRITICAL', 'This is a critical message');
logger.critical('This is a critical message');

logger.log('ALERT', 'This is a debug message');
logger.alert('This is a debug message');

logger.log('EMERGENCY', 'This is a emergency message');
logger.emergency('This is a emergency message');
```

## Changing Color codes

For colors, please check [code](src/logger.coffee).

```javascript
Logger.marks = [
    Logger.colors.Yellow + Logger.colors.BgRed + '!!> ',    // EMERGENCY
    Logger.colors.White + Logger.colors.BgRed + ' !> ',     // ALERT
    Logger.colors.White + Logger.colors.BgYellow + '  > ',  // CRITICAL
    Logger.colors.Red + '  > ',                             // ERROR
    Logger.colors.Yellow + '  > ',                          // WARNING
    Logger.colors.LightBlue + '  > ',                       // NOTICE
    Logger.colors.LightGreen + '  > ',                      // INFO
    Logger.colors.Default + '    '                          // DEBUG
]
```
