'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('places', [{
        place_id: 'ChIJ-QHaz2yb4okR_k-QLFvapa4',
        category: 'park',
        createdAt: '2017-12-14 01:23:55',
        updatedAt: '2018-01-02 03:01:19'
      },
      {
        place_id: 'ChIJMe2AD06D4okRrGmDpN6udpk',
        category: 'cafe',
        createdAt: '2017-12-14 01:23:55',
        updatedAt: '2018-01-02 03:01:19'
      },
      {
        place_id: 'ChIJ_cWe6Wmb4okRfzbGXpc6W3s',
        category: 'restaurant',
        createdAt: '2017-12-14 01:23:55',
        updatedAt: '2018-01-02 03:01:19'
      },
      {
        place_id: 'ChIJF3WRqw-X4okRAMwzPjd33TY',
        category: 'restaurant',
        createdAt: '2017-12-14 01:23:55',
        updatedAt: '2018-01-02 03:01:19'
      },
      {
        place_id: 'ChIJB5FhGXKX4okRc-wTEGCwpYY',
        category: 'park',
        createdAt: '2017-12-14 01:23:55',
        updatedAt: '2018-01-02 03:01:19'
      },
      {
        place_id: 'ChIJx-NLXhCX4okRLIUDciRszCo',
        category: 'cafe',
        createdAt: '2017-12-14 01:23:55',
        updatedAt: '2018-01-02 03:01:19'
      },
    ], {});
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