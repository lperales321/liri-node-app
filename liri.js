//Include axios npm package
const axios = require('axios');

//Read and Set Environment variables
require("dotenv").config();

//Import keys
var keys = require("./keys.js");

//Access Spotify keys
var spotify = new Spotify(keys.spotify);

//Get parameters and store it in a variable
const command = process.argv[2];
const search = process.argv[3];

switch(command) {
    case 'concert-this':
        console.log("Search Concert");
        searchConcert(search);
        break;
    case 'spotify-this-song':
        console.log("Search Song");
        searchSong(search);
        break;
    case 'movie-this':
        console.log("Search Movie");
        searchMovie(search);
        break;
    case 'do-what-it-says':
        console.log("Search File");
        searchFile(search);
        break;
}

function searchMovie(movieName) {
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);


    // Then create a request with axios to the queryUrl
    // ...
    axios
        .get(queryUrl)
        .then(function(response) {
            console.log(response.data.Year);
        })
        .catch(function(error) {
            console.log(error);
        })
}