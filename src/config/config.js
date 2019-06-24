const dotenv = require("dotenv");

dotenv.config();

const shouldEnableSequelizeLogging = () => {
    const DISABLE_SEQUELIZE_LOGGING = false;
    return process.env.SEQUELIZE_LOGGING || DISABLE_SEQUELIZE_LOGGING;
};
const config = {
    development: {
        database: process.env.POSTGRES_DB,
        username: process.env.POSTGRES_DB_USERNAME,
        password: process.env.POSTGRES_DB_PASSWORD,
        dialect: "postgres",
        options: {
            host: process.env.POSTGRES_DB_HOST,
            port: process.env.POSTGRES_DB_PORT,
            dialect: "postgres",
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            },
            logging: shouldEnableSequelizeLogging
        }
    },
    production: {
        use_env_variable: "PRODUCTION_DB_FULL_URI",
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        dialect: "postgres",
        dialectOptions: {
            ssl: true
        }
    }
};

module.exports = config;
