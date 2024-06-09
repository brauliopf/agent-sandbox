const path = require('path');

module.exports = {
    target: 'webworker',
    entry: './index.js',
    output: {
        filename: './bundle.js',
        path: path.resolve(__dirname, '../public'),
    },
    mode: 'development'
};