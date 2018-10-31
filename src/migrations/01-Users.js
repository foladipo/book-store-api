module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Users", {
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
    },

    down: (queryInterface) => {
        return queryInterface.dropTable("Users");
    }
};
