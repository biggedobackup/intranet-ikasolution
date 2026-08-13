const path = require('path');

/**
 * Personnalisation de la configuration webpack SPFx 1.23 (heft).
 * Injecte postcss-loader (TailwindCSS + autoprefixer) avant sp-css-loader
 * pour que les directives @tailwind soient compilées.
 */
module.exports = function (config) {
  if (config.module && Array.isArray(config.module.rules)) {
    for (const rule of config.module.rules) {
      if (rule.test && String(rule.test).includes('css') && Array.isArray(rule.use)) {
        const hasSpCssLoader = rule.use.some((entry) => {
          const loader = typeof entry === 'string' ? entry : entry.loader;
          return typeof loader === 'string' && loader.indexOf('sp-css-loader') !== -1;
        });
        if (hasSpCssLoader) {
          rule.use.push({
            loader: require.resolve('postcss-loader'),
            options: {
              postcssOptions: {
                config: path.join(__dirname, '..', 'postcss.config.js')
              }
            }
          });
        }
      }
    }
  }
  return config;
};
