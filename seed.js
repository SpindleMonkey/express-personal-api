// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var wishList = [
  {
    where: 'Iceland', 
    why: 'Icelandic sheep, Icelandic horses, the Blue lagoon, the Golden Circle, Northern Lights',
    when: '???',
    image: 'https://www.icelandprocruises.com/media/img/gallery/home/0006-gallery-iceland-godafoss.jpg',
  },
  {
    where: 'Sweden',
    why: 'weaving, Gotland sheep, textiles, ligonberries',
    when: 'summer solstice',
    image: 'http://www.tourist-destinations.net/wp-content/uploads/2013/06/sweden-1.jpg',
  },
  {
    where: 'Alaska',
    why: 'Musk Ox, glaciers, Denali, ferries, grizzlies',
    when: '???',
    image: 'http://www.alaska.org/photos/gallery3/var/albums/Best-of-Alaska-Articles/Must-See-in-Alaska/Northern-Lights/Northern-lights-in-Fairbanks1.jpg?m=1419023483',
  },
  {
    where: 'Ireland',
    why: 'to see Jean, Guinness, be surrounded by the Irish accent, music',
    when: 'whenever i can get there',
    image: 'https://storybookstorage.s3.amazonaws.com/items/images/000/407/355/original/20160519-6-h1rzbl.jpg?1463669902',
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
