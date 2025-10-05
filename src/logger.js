// src/logger.js
const fs = require('fs');
const path = require('path');
const { Console } = require('console');


const logsDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logFilePath = path.join(logsDir, 'app.txt');
const logFileStream = fs.createWriteStream(logFilePath, { flags: 'a' });


const loggerFile = new Console({
  stdout: logFileStream,
  stderr: logFileStream,
});


function timestamp() {
  return new Date().toISOString();
}

const logger = {

  info: (...args) => {
    const prefix = `${timestamp()} [INFO]`;
    console.log(prefix, ...args);
    loggerFile.log(prefix, ...args);
  },

  warn: (...args) => {
    const prefix = `${timestamp()} [WARN]`;
    console.warn(prefix, ...args);
    loggerFile.warn(prefix, ...args);
  },

  error: (...args) => {
    const prefix = `${timestamp()} [ERROR]`;
    console.error(prefix, ...args);
    loggerFile.error(prefix, ...args);
  },
};

module.exports = logger;