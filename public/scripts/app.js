console.log("Sanity Check: JS is working!");

$(document).ready(function() {

  $.ajax({
    method: 'GET',
    url: '/api/profile',
    success: handleSuccess,
    error: handleError
  });

});

// helper functions
function handleSuccess(json) {
  // insert the image
  $('#photo').append('<p><img src=\'' + json.github_profile_image + '\' alt=\'' + json.name + 'somebody\' ></p>');

  // build the list of cats/monkies:
  var listMonkies = 'She has a couple of pets: <ul>';

  for (var i = 0; i < json.pets.length; i++) {
    listMonkies = listMonkies + '<li>' + json.pets[i].name + 
        ' (a/k/a ' + json.pets[i].nickname + ') is a ' + json.pets[i].gender + ' ' + 
        json.pets[i].breed + '. ' + (json.pets[i].gender == 'female' ? 'She' : 'He') + 
        '\'s a ' + json.pets[i].type + '.</li>';
  }
  listMonkies = listMonkies + '</ul>';

  // build the techy stuff:
  $('#profileText').append('<p>' + json.name + ' is ' + 
      json.days_old + ' days old, and lives in ' + json.current_city + '.</p><p>' +
      listMonkies + '</p><p>Find her code at <a href=\'' + json.github_link + '\'>' +
      json.github_link + '</a>.</p>');
}

  //  name: 'Connie',
  //   days_old: ageInDays,
  //   github_link: 'https://github.com/SpindleMonkey',
  //   github_profile_image: 'https://avatars2.githubusercontent.com/u/3019766?v=4&u=bb613c37678dc30dc8d010d3d6b6dd1c762c7fc5&s=400',
  //   current_city: 'Coal Creek Canyon in unincorporated Jefferson County',
  //   pets: [
  //     {name: 'Winterfyre Anastasia', nickname: 'Annie', age: 16, gender: 'female', type: 'cat', breed: 'Norwegian Forest Cat'},
  //     {name: 'Winterfyre Winterfyre Oskar Sylvanus', nickname: 'Oskar', age: 13, gender: 'male', type: 'cat', breed: 'Norwegian Forest Cat'},
  //     {name: 'Winterfyre Zelda Gypsydottir', nickname: 'Zelda', age: 12, gender: 'female', type: 'cat', breed: 'Norwegian Forest Cat'},
  //     {name: 'Lost Woods Galia', nickname: 'Ollie', age: 9, gender: 'female', type: 'cat', breed: 'Norwegian Forest Cat'},
  //   ],
  // }



function handleError(e) {
  console.log('uh oh');
  $('#profileText').text('Failed to load profile, is the server working?');
}
