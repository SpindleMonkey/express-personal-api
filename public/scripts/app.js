console.log("Sanity Check: JS is working!");

$(document).ready(function() {

  $.ajax({
    method: 'GET',
    url: '/api/profile',
    success: handleSuccess,
    error: handleError
  });

  $.ajax({
    method: 'GET',
    url: '/api',
    success: handleApiSuccess,
    error: handleApiError
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

function handleError(e) {
  console.log('uh oh');
  $('#profileText').text('Failed to load profile; is the server working?');
}

function handleApiSuccess(json) {
  console.log(json);
  console.log(json.message);

  $('#docTitle').append('<p>' + json.message + '</p>');
  $('#docUrl').append('<p>Documentation URL: ' + json.documentation_url + '</p>');
  $('#baseUrl').append('<p>Base URL: ' + json.base_url + '</p>');

  // now dump the endpoints in the table
  var tableHead = '<table><thead><th>Method</th><th>Path</th><th>Description</th></thead>';
  var tableEnd = '</table>';
  var tableBody = '';

  for (var i = 0; i < json.endpoints.length; i++) {
    tableBody = tableBody + '<tr><td>' + json.endpoints[i].method + '</td><td>' +
        json.endpoints[i].path + '</td><td>' + json.endpoints[i].description + '</td></tr>';
  }

  $('#apiTable').append(tableHead + tableBody + tableEnd);
}

function handleApiError(json) {
  console.log('uh oh, part 2');
  $('#docText').text('Failed to load /api; is the server working?');
}
