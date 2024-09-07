export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    connectionString: process.env.MONGO_URI,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10),
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRY,
  },
});
