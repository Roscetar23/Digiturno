export default () => {
  return {
    PORT: parseInt(process.env.PORT) || 3000,
    MONGODB_CONNECTION: process.env.MONGODB_CONNECTION,
  };
};
