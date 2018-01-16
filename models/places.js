'use strict';
module.exports = (sequelize, DataTypes) => {

  var Places = sequelize.define('places', {
    place_id: DataTypes.STRING,
    category: DataTypes.STRING
  });

  //Each place has many Reviews
  Places.associate = function(models) {
    Places.hasMany(models.reviews, {
      onDelete: "cascade"
    });
  };

  return Places;
};