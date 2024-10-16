export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    connectionString: process.env.MONGO_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRY,
  },
});
