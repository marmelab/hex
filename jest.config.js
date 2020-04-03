module.exports = {
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest"
  },
  transformIgnorePatterns: ["/node_modules/"]
};
