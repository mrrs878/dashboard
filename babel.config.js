module.exports = {
  presets: [
    [
      "@babel/preset-env",
      "@babe;/preset-typescript",
      {
        targets: {
          node: "current"
        }
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }
    ],
    "@babel/plugin-syntax-dynamic-import",
    [
      "import",
      {
        "libraryName": "antd",
        "libraryDirectory": "es",
        "style": true
      }
    ]
  ]
};
