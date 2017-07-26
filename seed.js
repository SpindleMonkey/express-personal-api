// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var wishList = [
  {
    where: 'Iceland', 
    why: 'Icelandic sheep, Icelandic horses, the Blue lagoon, the Golden Circle, Northern Lights',
    when: '???',
    image: '',
  },
  {
    where: 'Sweden',
    why: 'weaving, Gotland sheep, textiles, ligonberries',
    when: 'summer solstice',
    image: '',
  },
  {
    where: 'Alaska',
    why: 'Musk Ox, glaciers, Denali, ferries, grizzlies',
    when: '???',
    image: '',
  },
  {
    where: 'Ireland',
    why: 'to see Jean, Guinness, be surrounded by the Irish accent, music',
    when: 'whenever i can get there',
    image: '',
  },
];

db.Travel.remove({}, function(err, travels) {
  console.log('removed all travel destinations');

  db.Travel.create(wishList, function(err, travels) {
    if (err) {
      return console.log("Error: ", err);
    }

    console.log('Created new travel destination', travels._id);
    process.exit(); // we're all done! Exit the program.
  });
});
