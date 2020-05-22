'use strict';


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
    .then(responseJson => {console.log(responseJson);
      // displayResults(responseJson) 
    })
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });

}



// Spotify API: get authentication and login: fix the Request URI to fit this:

// const loginBaseURL = 'https://accounts.spotify.com/authorize';
// const clientID = 'd3c3efee0eb04d5ea828f52d23aec551';
// const client_secret = '1a2035d2215240d2a4d0c72b8b3d60fe';


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

//     fetch(loginURL)
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             }
//             throw new Error(response.statusText);
//         })
//         .then(responseJson => displayResults(responseJson))
//         .catch(err => {
//             $('#js-error-message').text(`Something went wrong: ${err.message}`);
//         });
// }


// function displayResults(responseJson) {
//     // if there are previous results, remove them
//     console.log(responseJson);

//   };


// function watchForm() {
//     $('#spotify-login').on('click', event => {
//         event.preventDefault();
//         getLogin();
//     });
// }

// $(watchForm);












// YOUTUBE API: SEARCH

const apiKey = 'AIzaSyCrNFDWvZ5nEcTWr0kWf9CYCjbZblaNKs8';
const searchURL = 'https://www.googleapis.com/youtube/v3/search';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.items.length; i++) {
    // for each video object in the items 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail
    $('#results-list').append(
      `<li><h3 class="artist-name">$</h3>
       <iframe src="https://www.youtube.com/embed/${responseJson.items[i].id.videoId}" name="The Weeknd" width="560" height="315" frameborder="0" allowfullscreen></iframe>
       </li>`
    )
  };
  //display the results section  
  $('#results').removeClass('hidden');
};

function getYouTubeVideos(query, maxResults = 10) {
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
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getYouTubeVideos(searchTerm, maxResults);
  });
}

$(watchForm);







// YOUTUBE API: VIDEOS



const videoURL = 'https://www.youtube.com/embed/VIDEO_ID';