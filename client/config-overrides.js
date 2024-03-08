// config-overrides.js
const path = require('path');

module.exports = function override(config, env) {
    // 添加别名
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
};
