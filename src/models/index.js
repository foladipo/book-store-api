import Users from "./Users";
import Books from "./Books";

Users.hasMany(Books, {
    foreignKey: "ownerId"
});

Books.belongsTo(Users, {
    foreignKey: "ownerId"
});

export { Books };
export { Users };
