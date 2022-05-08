module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          alias: {
            '@src': './src',
            '@components': './src/components',
            '@configs': './src/configs',
            '@hooks': './src/hooks',
            '@assets': './src/assets',
            '@native-base/icons': '@native-base/icons/lib',
          },
        },
      ],
    ],
  };
};
