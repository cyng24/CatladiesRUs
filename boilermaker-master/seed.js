// This file should contain all the record creation needed to seed the database with its default values.
// The data can then be loaded with the node seed.js

var Promise = require("bluebird");
var {
  db,
  Place,
  Hotel,
  Restaurant,
  Activity
} = require('./models');

var data = {
  hotel: [
    {
      name: "Cosmopolitan Hotel",
      place: {
        address: "95 W Broadway",
        city: "New York",
        state: "NY",
        phone: "123-456-7890",
        location: [-74.008922, 40.715681]
      },
      num_stars: 3.5,
      amenities: "Free Wif-Fi"
    },
    {
      name: "Club Quarters",
      place: {
        address: "140 Washington St",
        city: "New York",
        state: "NY",
        phone: "123-456-7890",
        location: [-74.01394, 40.70963]
      },
      num_stars: 4,
      amenities: "Free Wif-Fi"
    }
  ],
  restaurant: [
    {
      name: "Rayuela",
      place: {
        address: "165 Allen St",
        city: "New York",
        state: "NY",
        phone: "123-456-7890",
        location: [-73.989756, 40.721266]
      },
      cuisine: "Spanish, Latin American",
      price: 3
    },
    {
      name: "Xe Lua",
      place: {
        address: "86 Mulberry St",
        city: "New York",
        state: "NY",
        phone: "123-456-7890",
        location: [-73.998626, 40.716544]
      },
      cuisine: "Vietnamese",
      price: 1
    }
  ],
  activity: [
    {
      name: "Union Square Holiday Market",
      place: {
        address: "Union Sq & W 14th St",
        city: "New York",
        state: "NY",
        phone: "123-456-7890",
        location: [-73.987995, 40.733615]
      },
      age_range: "All"
    },
    {
      name: "Strand Bookstore",
      place: {
        address: "828 Broadway",
        city: "New York",
        state: "NY",
        phone: "123-456-7890",
        location: [-73.99087, 40.733274]
      },
      age_range: "All"
    }
  ]
};

db
  .sync({ force: true })
  .then(function() {
    console.log("Dropped old data, now inserting data");
    return Promise.map(Object.keys(data), function(name) {
      return Promise.map(data[name], function(item) {
        return db.model(name).create(item, {
          include: [Place]
        });
      });
    });
  })
  .then(function() {
    console.log("Finished inserting data");
  })
  .catch(function(err) {
    console.error("There was totally a problem", err, err.stack);
  })
  .finally(function() {
    db.close(); // uses promises but does not return a promise. https://github.com/sequelize/sequelize/pull/5776
    console.log("connection closed"); // the connection eventually closes, we just manually do so to end the process quickly
    return null; // silences bluebird warning about using non-returned promises inside of handlers.
  });
