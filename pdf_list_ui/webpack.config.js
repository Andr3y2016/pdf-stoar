var path = require('path')
var webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
// const PurifyCSSPlugin = require("purify-css")
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all');
// const path = require('path')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
          // other vue-loader options go here
          , extractCSS: (process.env.NODE_ENV === 'production')
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    proxy: {
      // '/folders': 'http://127.0.0.1:80'
    },
  },
  performance: {
    hints: false
  },
  plugins: [new ExtractTextPlugin("main.css")
    , 
  //   new PurifyCSSPlugin({
  //   // Give paths to parse for rules. These should be absolute!
  //   paths: glob.sync([
  //     path.join(__dirname, './src/index.html'),
  //     path.join(__dirname, './**/*.vue'),
  //     path.join(__dirname, './src/**/*.js')
  //   ])
  // })
    // new PurifyCss({
    //   paths: glob.sync([path.join(__dirname, 'index.html'), path.join(__dirname, 'src/**/*.vue')]),
    //   minimize: false

    // })
  //  new PurgecssPlugin({
  //     paths:  
		// 	paths: glob.sync([
		// 	path.join(__dirname, './index.html'),
		// 	path.join(__dirname, './src/*.vue'),
		// 	path.join(__dirname, './src/*.js')
		// ])
  //   })
      // new PurgecssPlugin({
	     //    // paths: glob.sync([
	     //    //   path.join(__dirname, './src/index.html'),
	     //    //   path.join(__dirname, './**/*.vue'),
	     //    //   path.join(__dirname, './src/**/*.js')
	     //    // ])
	     //    paths: glob.sync(path.join(__dirname, './src/*.vue')),
      // })
  ],
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
        drop_console: true,        
      },
       output: {
          comments: false
        }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
