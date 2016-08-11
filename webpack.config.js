module.exports = {
     entry: './lib/index.js',
     output: {
         path: './bin',
         filename: 'index.bundled.js'
     },
     module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }]
    }
 };
