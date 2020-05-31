'use strict';

// Spotify API Login: 
const loginBaseURL = 'https://accounts.spotify.com/authorize';
const clientID = 'd3c3efee0eb04d5ea828f52d23aec551';

$(function getLogin() {
  const params = {
    client_id: clientID,
    response_type: 'token',
    // redirect uri must be updated on Spotify Dashboard: https://developer.spotify.com/dashboard/login
    // redirect_uri for Github: https://marfriaz.github.io/couchella/
    // redirect_uri for VS Code: http://127.0.0.1:5500/couchella/index.html
    redirect_uri: 'http://127.0.0.1:5500/couchella/index.html',
  };

  const queryString = formatQueryParams(params);
  const loginURL = loginBaseURL + '?' + queryString;
  // console.log(loginURL);

  $('.login-container').html(`
    <a id="spotify-login" href="${loginURL}">Log in with Spotify</a>
  `);
})


//Spotify API: Authentication
var accessTokenValue = '';

window.onload = function () {
  console.log('document loaded');
  const accessToken = location.hash.substring(1).split('&').map(param => param.split('='))[0][0];
  if (accessToken) {
    accessTokenValue = location.hash.substring(1).split('&').map(param => param.split('='))[0][1];

    //   var authObj={}; 
    //   authObj[accessToken]=location.hash.substring(1).split('&').map(param=>param.split('='))[0][1];
    // return authObj; 
    getArtists();
    $('.sign-in').hide();
    $('.goes-here').hide();
    $('.next-page').show();
  }
}

// Spotify API: get artists
const baseURL = 'https://api.spotify.com/v1/me/top/artists';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

// uses Spotify API to attain user's most played artists
function getArtists() {
  console.log(accessTokenValue);
  const params = {
    limit: 12,
    time_range: 'long_term',
  };

  const queryString = formatQueryParams(params)
  const url = baseURL + '?' + queryString;

  console.log(baseURL);

  const options = {
    headers: new Headers({
      'Authorization': 'Bearer ' + accessTokenValue
    })
  };

  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayEditableLineup(responseJson) )
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

// artists array that we'll be editing and displaying
let artists= [];

//displays initial lineup from user's most played artists
function displayEditableLineup(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#editable-lineup-page').removeClass('hidden');

  for (let i = 0; i < responseJson.items.length; i++){
    artists[i] = responseJson.items[i].name
  };
    // console.log(artists);
    renderArtists();
  }
 

// gets index of artist that had "delete" button clicked
function getArtistIndexFromClicked(item) {
  // turn item into a jQuery object
  return $(item).data('index')
}


function deleteArtist() {
  $('.artist-list').on('click','.artist-delete', event => {
    event.preventDefault();
    // console.log('clicked', $(event.currentTarget).data('index'));
    const id = getArtistIndexFromClicked(event.currentTarget);
    
    artists.splice(id, 1);
    renderArtists ();
  })
}



function addArtist () {
  $('#edit-lineup-form').submit(event => {
    event.preventDefault();
    let newArtistName = $('#lineup-entry').val();
    if (newArtistName) {
      artists.push(newArtistName);
    }
  renderArtists ();
  });
}

// render updated artists array and display on edit page
function renderArtists () {
  // create a string variable
  let artistHTML = '';

  for (let i = 0; i < artists.length; i++){
    // appending and changing DOM is expensive
    artistHTML +=
      `<li>
        <span class="editing-artist-name">${artists[i]}</span>
        <button class="artist-delete edit-button" data-index="${i}">
          <span class="button-label">delete</span>
        </button>
      </li>`;
  }
    $('.artist-list').html(artistHTML);

}

function generateFestival () {
  $('#generate-button').on('click', function(event) {
    event.preventDefault();
    $('#editable-lineup-page').toggleClass('hidden');
    console.log('clicked');

    displayLineup(artists)

  });
  }

$(deleteArtist);
$(addArtist);
$(generateFestival);


  function displayLineup(artists) {
    // if there are previous results, remove them
    console.log(artists);
    $('#user-lineup').empty();
  
      $('.user-lineup').append(
        `<h3 class="headliners">${artists[0]} &nbsp ${artists[1]}</h3>
        `
      );
  
      $('.user-lineup').append(
        `<h4 class="headliners">${artists[3]} &nbsp ${artists[4]} &nbsp ${artists[5]}</h4>
        `
      );
  
      $('.user-lineup').append(
        `<h4 class="headliners">${artists[6]} &nbsp ${artists[7]} &nbsp ${artists[8]} &nbsp ${artists[9]}</h4>
        `
      );
  
      $('.user-lineup').append(
        `<h4 class="headliners">${artists[10]} &nbsp ${artists[11]} &nbsp ${artists[12]}</h4>
        `
      );
      
      for (let i = 0; i < 12; i++) {
        let query= responseJson.items[i].name + ' concert';
        let headlinerName= responseJson.items[i].name;
  
        // COMMENT OUT TO NOW WASTE FETCH-----------
        // getYouTubeVideos(query, headlinerName)
      };
  
  };







// YOUTUBE API: SEARCH

const apiKey = 'AIzaSyAJWZSpZ9AhqlYkso42fSUdWXQQcJvAjuk';
const searchURL = 'https://www.googleapis.com/youtube/v3/search';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}


function getYouTubeVideos(query, headlinerName, maxResults = 1) {

  const params = {
    key: apiKey,
    q: query,
    part: 'snippet',
    maxResults,
    type: 'video'
  };

  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayVideos(responseJson, headlinerName))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });

}



function displayVideos(responseJson, headlinerName) {
  // if there are previous results, remove them
  console.log(responseJson, headlinerName);
  $('#videos-list').append(
    `<li><h3 class="artist-name">${headlinerName}</h3>
      <iframe src="https://www.youtube.com/embed/${responseJson.items[0].id.videoId}" frameborder="0" allow="encrypted-media" allowfullscreen></iframe>
      </li>`
  )
  
  //display the results section  
  $('.videos-intro').removeClass('hidden');
}



// YOUTUBE API: VIDEOS


const videoURL = 'https://www.youtube.com/embed/VIDEO_ID';

