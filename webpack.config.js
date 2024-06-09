const path = require('path');

module.exports = {
    entry: './src/bagger.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './src'),
    },
    mode: 'development'
};