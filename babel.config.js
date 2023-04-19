module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        extensions: [".ios.js", ".android.js", ".js", ".json", ".ts", ".tsx"],
        alias: {
          "@": "./src",
        },
      },
    ],
  ],
  env: {
    production: {
      plugins: ["transform-remove-console"],
    },
  },
};
