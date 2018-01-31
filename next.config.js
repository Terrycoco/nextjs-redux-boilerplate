const path = require('path')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const glob = require('glob');


module.exports = {
  webpack: (config, { dev }) => {
    config.module.rules.push(
      {
        test: /\.(css|scss)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      }
    ,
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader']
      }
    ,
      {
        test: /\.s(a|c)ss$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader',
          { loader: 'sass-loader',
            options: {
              includePaths: ['styles', 'node_modules']
                .map((d) => path.join(__dirname, d))
                .map((g) => glob.sync(g))
                .reduce((a, c) => a.concat(c), [])
            }
          }
        ]
      }
    );

    // config.plugins.push(
    //   new SWPrecacheWebpackPlugin({
    //     cacheId: 'my-project-name',
    //     filename: 'my-project-service-worker.js',
    //     verbose: true,
    //     mergeStaticsConfig: true,
    //     staticFileGlobsIgnorePatterns: [/\.next\//],
    //     runtimeCaching: [
    //       {
    //         handler: 'networkFirst',
    //         urlPattern: /^https?.*/
    //       }
    //     ]
    //   })
    // );

    /**
     * Install and Update our Service worker
     * on our main entry file :)
     * Reason: https://github.com/ooade/NextSimpleStarter/issues/32
     */
    // const oldEntry = config.entry

    // config.entry = () =>
    //   oldEntry().then(entry => {
    //     entry['main.js'].push(path.resolve('service-worker'))
    //     return entry
    //   })

    // /* Enable only in Production */
    // if (!dev) {
    //   // Service Worker
    //   config.plugins.push(
    //     new SWPrecacheWebpackPlugin({
    //       verbose: true,
    //       staticFileGlobsIgnorePatterns: [/\.next\//],
    //       runtimeCaching: [
    //         {
    //           handler: 'nextworkFirst',
    //           urlPattern: /^https?.*/
    //         }

    //       ]
    //     })
    //   )
    // }

    return config
  }
}