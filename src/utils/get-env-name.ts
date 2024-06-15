// define getEnv name by process.env.NODE_ENV
export const getEnvPath = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return '.production.env';
    default:
      return '.development.env';
  }
};
