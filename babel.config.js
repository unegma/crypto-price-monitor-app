module.exports = function(api) {

  // may need to run the following command when using with .env
  // rm -rf node_modules/.cache/babel-loader/*
  // https://github.com/goatandsheep/react-native-dotenv#caveats
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        "module:react-native-dotenv", {
          "moduleName": "@env",
          "path": ".env",
          "blacklist": null,
          "whitelist": null,
          "safe": false,
          "allowUndefined": false
        }
      ]
    ],
  };
};
