

const baseURL = 'https://api.spotify.com/v1/me/top/artists';


const hash = window.location.href;

console.log(hash)

if 






function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }
  
  
function getArtists() {
    const params = {
        limit: 12,
        time_range: long_term,
    };

    const queryString = formatQueryParams(params)
    const url = baseURL + '?' + queryString;
  
    console.log(baseURL);
  
    const options = {
      headers: new Headers({
        "Authorization": access_token})
    };
  
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson, maxResults))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
  }
  















 

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