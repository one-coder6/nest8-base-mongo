module.exports = {
  apps: [
    {
      name: 'component-manager-node',
      script: 'dist/main.js',
      env: {
        NODE_ENV: 'development',
      },
      env_test: {
        NODE_ENV: 'test',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
