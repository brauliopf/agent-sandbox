const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: './bundle1.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development'
};