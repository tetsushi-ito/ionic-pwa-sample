const path = require('path');

const webpackConfig = require('./node_modules/@ionic/app-scripts/config/webpack.config');

const alias = {
  '@pages': path.join(__dirname, './src/pages'),
  '@models': path.join(__dirname, './src/models'),
  '@services': path.join(__dirname, './src/services'),
  '@constants': path.join(__dirname, './src/constants'),
};

webpackConfig.dev.resolve.alias = alias;
webpackConfig.prod.resolve.alias = alias;
