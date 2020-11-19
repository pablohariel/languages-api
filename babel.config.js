module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@config': './src/config',
        '@modules': './src/modules',
        '@controllers': './src/controllers',
        '@views': './src/views'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
