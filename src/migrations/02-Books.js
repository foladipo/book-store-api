module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Books", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: true,
                primaryKey: true
            },
            ownerId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            author: {
                type: Sequelize.STRING,
                allowNull: false
            },
            publicationDate: {
                type: Sequelize.DATE,
                allowNull: false
            },
            genres: {
                // NB: Sequelize only supports this column type for Postgres.
                // http://docs.sequelizejs.com/variable/index.html#static-variable-DataTypes
                type: Sequelize.JSONB,
                allowNull: false,
                defaultValue: []
            },
            isPrivate: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });
    },

    down: (queryInterface) => {
        return queryInterface.dropTable("Books");
    }
};
