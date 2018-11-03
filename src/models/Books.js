import Sequelize from "sequelize";
import initSequelize from "../util/initSequelize";

const sequelizeInstance = initSequelize();
const Books = sequelizeInstance.define("Books", {
    id: {
        type: Sequelize.INTEGER,
    },
    ownerId: {
        type: Sequelize.INTEGER
    },
    title: {
        type: Sequelize.STRING
    },
    author: {
        type: Sequelize.STRING
    },
    publicationDate: {
        type: Sequelize.DATE
    },
    genres: {
        type: Sequelize.JSONB
    },
    isPrivate: {
        type: Sequelize.BOOLEAN
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
}, {
        freezeTableName: true
    }
);

export default Books;
