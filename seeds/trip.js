
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('trip').del()
    .then(function () {
      // Inserts seed entries
      const trips = [{
        trip_code: 1,
        trip_name: 'Holiday',
        start_lat: '-7.782',
        start_lng: '110.360',
        end_lat:'-8.65',
        end_lng:'115.216'
      }, {
        trip_code: 2,
        trip_name: 'Home',
        start_lat: '-7.782',
        start_lng: '110.360',
        end_lat:'-0.949',
        end_lng:'100.354'
      }, {
        trip_code: 3,
        trip_name: 'Bisnis',
        start_lat: '-7.782',
        start_lng: '110.360',
        end_lat:'-6.903',
        end_lng:'107.618'
      }];

      return knex('trip').insert('trips');
    });
};
