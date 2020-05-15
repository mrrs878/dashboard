const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra');
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    localIdentName: '[local]--[hash:base64:5]',
    javascriptEnabled: true
  }),
  addWebpackAlias({
    "@": resolve("src")
  })
);
