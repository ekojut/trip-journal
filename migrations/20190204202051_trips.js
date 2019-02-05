
exports.up = function(knex, Promise) {
	return knex.schema.
		createTable('trip', (table) => {
		    table.increments('id');
		    table.integer('trip_code').notNullable();
		    table.string('trip_name').notNullable();
		    table.string('start_lat').notNullable();
		    table.string('start_lng').notNullable();
		    table.string('end_lat').notNullable();
		    table.string('end_lng').notNullable();
  	})

	.createTable('waypoint', (table) => {
		table.increments('id');
	    table.integer('trip_code').notNullable();
	    table.string('waypoint_lat').notNullable();
	    table.string('waypoint_lng').notNullable();
	});
  
};

exports.down = function(knex, Promise) {
  	return knex.schema
  		.dropTable('trip')
		.dropTable('waypoint')
};
