const webpack = require('webpack')

module.exports = (config, { buildId, isServer }) => {
  if (!isServer && config.optimization.minimize && config.optimization.splitChunks.cacheGroups) {
    // Create a separate cache group for webgi source
    config.optimization.splitChunks.cacheGroups.webgi = {
      test: module => {
        return module.resource ? module.resource.includes('/node_modules/webgi/') : false
      },
      name: 'webgi',
      chunks: 'all',
      priority: 1000,
      usedExports: false,
    }
    // Bypass minification for webgi cache group to prevent double minification and issues with mangling.
    const terser = config.optimization.minimizer[0]
    config.optimization.minimizer[0] = compiler => {
      compiler.hooks.thisCompilation.tap('webgi-no-minify', compilation => {
        compilation.hooks.processAssets.tap(
          {
            name: 'webgi-no-minify',
            stage: webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE,
          },
          assets => {
            const names = Object.keys(assets)
            names.forEach(name => {
              if (name.includes('/chunks/webgi')) {
                // Mark the asset as already minified to prevent terser from minifying it again.
                compilation.updateAsset(
                  name,
                  s => s,
                  info => {
                    info.minimized = true
                    return info
                  }
                )
              }
            })
          }
        )
      })
      terser(compiler)
    }
  }
  return config
}
