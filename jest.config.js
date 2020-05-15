module.exports = {
  preset: "ts-jest",
  testMatch: ["<rootDir>/test/**/*.(spec|test).ts?(x)"],
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!(@ant-design))"]
};
