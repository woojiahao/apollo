/* eslint global-require: off, import/no-extraneous-dependencies: off */

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
  ]
};