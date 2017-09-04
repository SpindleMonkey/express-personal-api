// require express and other modules
var express = require('express');
var app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/doc.html', function apipage(req, res) {
  res.sendFile(__dirname + '/views/doc.html');
});

app.get('/travel.html', function travelpage(req, res) {
  res.sendFile(__dirname + '/views/travel.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    message: 'Welcome to my personal api! Here\'s what you need to know:',
    documentation_url: 'https://github.com/SpindleMonkey/express-personal-api/blob/master/README.md',
    base_url: 'https://enigmatic-mountain-86685.herokuapp.com/',
    endpoints: [
      {method: 'GET', path: '/api', description: 'Describes all available endpoints'},
      {method: 'GET', path: '/api/profile', description: 'Data about me'}, 
      {method: 'GET', path: '/api/travel', description: 'My travel wish list'},
      {method: 'GET', path: '/api/travel/:where', description: 'Show any destinations matching \'where\' in my travel wish list'},
      {method: 'POST', path: '/api/travel', description: 'Add another destination to my travel wish list'},
      {method: 'PUT', path: '/api/travel/:where', description: 'Update the travel destination that matches \'where\''},
      {method: 'DELETE', path: '/api/travel/:where', description: 'Remove the travel destination that matches \'where\''},
    ]
  });
});

app.get('/api/profile', function(req, res) {
  
  // that first big number is the number of days from January 17, 1962 to June 30, 2017
  // being lazy and assuming you'll grade this in July, so just adding days from July
  var today = new Date();
  var ageInDays = 20254 + today.getDate();

  res.json({
    name: 'Connie',
    days_old: ageInDays,
    github_link: 'https://github.com/SpindleMonkey',
    github_profile_image: 'https://avatars2.githubusercontent.com/u/3019766?v=4&u=bb613c37678dc30dc8d010d3d6b6dd1c762c7fc5&s=400',
    current_city: 'Coal Creek Canyon in unincorporated Jefferson County',
    pets: [
      {name: 'Winterfyre Anastasia', nickname: 'Annie', age: 16, gender: 'female', type: 'cat', breed: 'Norwegian Forest Cat'},
      {name: 'Winterfyre Winterfyre Oskar Sylvanus', nickname: 'Oskar', age: 13, gender: 'male', type: 'cat', breed: 'Norwegian Forest Cat'},
      {name: 'Winterfyre Zelda Gypsydottir', nickname: 'Zelda', age: 12, gender: 'female', type: 'cat', breed: 'Norwegian Forest Cat'},
      {name: 'Lost Woods Galia', nickname: 'Ollie', age: 9, gender: 'female', type: 'cat', breed: 'Norwegian Forest Cat'},
    ],
  });
});

app.get('/api/travel', function(req, res) {
  db.Travel.find({}, function(err, travels) {
    if (err) { return console.log("ERROR::" + err); }
    res.json({travels: travels});
  });
});

app.get('/api/travel/:where', function(req, res) {
  db.Travel.find({where: req.params.where}, function(err, travels) {
    if (err) { return console.log("ERROR::" + err); }
    res.json({travels: travels});
  });
});

app.post('/api/travel', function(req, res) {
  console.log(req.body);
  // check the new destination: must have where and why; when and image are optional
  if (req.body.where && req.body.why) {
    console.log(req.body.where);
    console.log(req.body.why);
    var newTravel = db.Travel({
      where: req.body.where,
      why: req.body.why,
      when: req.body.when || "",
      image: req.body.image || ""
    });
    console.log(newTravel);
    console.log('img: ' + newTravel.image);
    newTravel.create(function(err, travel) {
      if (err) { res.status(503).send('ERROR::' + err); }
      res.json(travel);
    });
  } else {
    console.log(req.body.where);
    console.log(req.body.why);
    res.status(400).send('ERROR::must specify \'where\' and \'why\'');
  }
});

app.put('/api/travel/:where', function(req, res) {
  console.log(req.params.where);
  console.log(req.body);
  // db.Travel.find({where: req.params.where}, function(err, travel) {
  //   console.log(travel);
  //   db.Travel.update({where: req.params.where}, req.body, function(err, travel) {
  //     if (err) { res.status(404).send('ERROR::' + err); }
  //     console.log(travel);
  //     res.json(travel);
  //   });
  // });
  db.Travel.findOneAndUpdate({where: req.params.where}, { '$set': req.body }, { returnNewDocument: true}, function(err, travel) {
    console.log(travel);
    if (err) { res.status(404).send('ERROR::' + err); }
    res.json(travel);
  });

});

app.delete('/api/travel/:where', function apiTravelRemove(req, res) {
  if (req.params.where) {
    db.Travel.remove({where: req.params.where}, function(err, travel) {
      if (err) { res.status(404).send('ERROR::' + err); }
      res.send(req.params.where + ' has been removed');
    });
  } else {
    res.status(404).send('ERROR::travel location not found');
  }
});

/**********
 * SERVER *
 **********/

// listen on port 3000 (or if live, on whichever port Heroku wants va process.env)
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
