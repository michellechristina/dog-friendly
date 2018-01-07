module.exports = function (sequelize, DataTypes) {
    var Outdoors = sequelize.define("Outdoors", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dogFriendly: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Outdoors;
};