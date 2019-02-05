
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('waypoint').del()
    .then(function () {
      // Inserts seed entries
      const waypoints = [{
        trip_code: 1,
        waypoint_lat: '-7.249',
        waypoint_lng: '112.750'
      }, {
        trip_code: 2,
        waypoint_lat: '-6.214',
        waypoint_lng: '106.845'
      }, {
        trip_code: 2,
        waypoint_lat: '-6.993',
        waypoint_lng: '110.420'
      },
      {
        trip_code: 3,
        waypoint_lat: '-6.214',
        waypoint_lng: '106.845'
      }];

      return knex('waypoint').insert('waypoints');
    });
};
