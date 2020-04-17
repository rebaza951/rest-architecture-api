if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  APP_NAME: process.env.APP_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  CACHE_KEY: process.env.CACHE_KEY,
  SWAGGER_PATH: `../config/swagger/${process.env.SWAGGER_DOC}.json`,
};
