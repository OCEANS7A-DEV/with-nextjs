module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'], // Expo に統一

    plugins: [
      // react-native-web のエイリアス設定（問題なし）
      [
        'module-resolver',
        {
          alias: {
            'react-native$': 'react-native-web',
          },
        },
      ],

      // react-native-paper のバベル変換（どの環境でも必要）
      'react-native-paper/babel',

      // Reanimated は必ず最後！
      'react-native-reanimated/plugin',
    ],
  };
};
