var webpack = require("webpack");
var path = require("path");

module.exports = {

    context: __dirname,

    entry: {
        content_script: path.join(__dirname, 'src/content_script.js'),
        background: path.join(__dirname, 'src/background.js'),
        popup: path.join(__dirname, 'src/popup.js')
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
        // chunkFilename: '[id].chunk.js'
    },


    // resolve: {
    //     modulesDirectories: ['src', 'node_modules'],
    //     extensions: ["", ".webpack.js", ".web.js", ".js"]
    // },
    //
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                    retainLines: true,
                }
            }
        ]
    }

    // One chunk per dist for now - we'll change this later
    // plugins: [
    //     new webpack.optimize.LimitChunkCountPlugin({
    //         maxChunks: 1
    //     }),
    // ],

    // devtool: "source-map"

};

// if (process.env.NODE_ENV === 'production') {
//
//     config.plugins.push(new webpack.DefinePlugin({
//         'process.env.NODE_ENV': '"production"',
//     }));
//
//     config.plugins.push(new webpack.optimize.UglifyJsPlugin({
//         compress: {
//             warnings: false
//         }
//     }));
//
// }

// return config;
