'use strict';

// Spotify API: get authentication and login: fix the Request URI to fit this:

// const loginBaseURL = 'https://accounts.spotify.com/authorize';
// const clientID = 'd3c3efee0eb04d5ea828f52d23aec551';


// const params = {
//     //set the "q" parameter equal to the value the user input
//     client_id: clientID,
//     response_type: 'token',
//     redirect_uri: 'http://127.0.0.1:5500/spotify-music-festival/index.html',
// };

// $('#spotify-login').html(`
//     <a id="spotify-login" href="${loginURL}">Log in with Spotify</a>
//     `);

// function formatQueryParams(params) {
//     const queryItems = Object.keys(params)
//       .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
//     return queryItems.join('&');
//   }

// function getLogin() {
//     //create the query parameters
//     const params = {
//         //set the "q" parameter equal to the value the user input
//         client_id: clientID,
//         response_type: 'token',
//         redirect_uri: 'https://www.google.com',
//     };

//     const queryString = formatQueryParams(params);
//     const loginURL = loginBaseURL + '?' + queryString;

//     console.log(loginURL);





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
    .then(responseJson => displayLineup(responseJson) )
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });

}


function displayLineup(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#user-lineup').empty();

    $('.user-lineup').append(
      `<h3 class="headliners">${responseJson.items[0].name} &nbsp ${responseJson.items[1].name}</h3>
      `
    );

    $('.user-lineup').append(
      `<h4 class="headliners">${responseJson.items[2].name} &nbsp ${responseJson.items[3].name} &nbsp ${responseJson.items[4].name}</h4>
      `
    );

    $('.user-lineup').append(
      `<h4 class="headliners">${responseJson.items[5].name} &nbsp ${responseJson.items[6].name} &nbsp ${responseJson.items[7].name} &nbsp ${responseJson.items[8].name}</h4>
      `
    );

    $('.user-lineup').append(
      `<h4 class="headliners">${responseJson.items[9].name} &nbsp ${responseJson.items[10].name} &nbsp ${responseJson.items[11].name}</h4>
      `
    );
    
    for (let i = 0; i < 12; i++) {
      let query= responseJson.items[i].name + ' concert';
      let headlinerName= responseJson.items[i].name;



      // COMMENT OUT TO NOW WASTE FETCH
      getYouTubeVideos(query, headlinerName)
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
};



// YOUTUBE API: VIDEOS


const videoURL = 'https://www.youtube.com/embed/VIDEO_ID';