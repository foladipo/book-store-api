const dotenv = require("dotenv");

dotenv.config();

let enableLogging;
if (process.env.SEQUELIZE_LOGGING === "false") {
    enableLogging = false;
} else {
    enableLogging = true;
}

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
            logging: enableLogging
        }
    }
};

module.exports = config;
