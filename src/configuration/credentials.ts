export default () => {
  return {
    PORT: parseInt(process.env.PORT) || 4000,
    MONGODB_CONNECTION: process.env.MONGODB_CONNECTION,
  };
};
