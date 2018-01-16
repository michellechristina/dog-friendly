'use strict';
module.exports = (sequelize, DataTypes) => {
  var places = sequelize.define('places', {
    place_id: DataTypes.STRING,
    category: DataTypes.STRING
 
  });
  return places;
};