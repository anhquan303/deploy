const argv = require('./argv');

module.exports = parseInt(argv.port || process.env.PORT || '5050', 10);
