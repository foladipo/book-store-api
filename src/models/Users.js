import Sequelize from "sequelize";
import initSequelize from "../util/initSequelize";

const sequelizeInstance = initSequelize();
const Users = sequelizeInstance.define("Users", {
    id: {
        type: Sequelize.INTEGER,
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
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

export default Users;
