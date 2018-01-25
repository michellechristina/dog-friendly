'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('reviews', [{
        friendly_rating: 4,
        review: 'a review goes here',
        placeId: 1,
        createdAt: '2017-12-14 01:23:55',
        updatedAt: '2018-01-02 03:01:19'
      },
      {
        friendly_rating: 2,
        review: 'another review goes here',
        placeId: 2,
        createdAt: '2017-12-14 01:23:55',
        updatedAt: '2018-01-02 03:01:19'
      },
      {
        friendly_rating: 3,
        review: 'a review goes here',
        placeId: 3,
        createdAt: '2017-12-14 01:23:55',
        updatedAt: '2018-01-02 03:01:19'
      },
      {
        friendly_rating: 5,
        review: 'a review goes here',
        placeId: 3,
        createdAt: '2017-12-14 01:23:55',
        updatedAt: '2018-01-02 03:01:19'
      },
      {
        friendly_rating: 4,
        review: 'a review goes here',
        placeId: 1,
        createdAt: '2017-12-14 01:23:55',
        updatedAt: '2018-01-02 03:01:19'
      },
      {
        friendly_rating: 2,
        review: 'a review goes here',
        placeId: 1,
        createdAt: '2017-12-14 01:23:55',
        updatedAt: '2018-01-02 03:01:19'
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
