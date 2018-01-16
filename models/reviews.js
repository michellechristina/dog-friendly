'use strict';
module.exports = (sequelize, DataTypes) => {

  var Reviews = sequelize.define('reviews', {
    friendly_rating: DataTypes.INTEGER,
    review: DataTypes.STRING
  });

  //Each review belongs to one place
  Reviews.associate = function(models) {
    Reviews.belongsTo(models.places, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Reviews;
};