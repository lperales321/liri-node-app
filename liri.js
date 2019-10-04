//Include axios npm package
const axios = require('axios');
const moment = require('moment');

//Read and Set Environment variables
require("dotenv").config();

//Import keys
const keys = require("./keys.js");

//Access Spotify keys
//var spotify = new Spotify(keys.spotify);

const divider = "\n------------------------------------------------------------------------------------\n";

//Get parameters and store it in a variable
const command = process.argv[2];
const search = process.argv[3];

console.log(`Action: ${command}`);
console.log(`Search: ${search}`);

switch(command) {
    case 'concert-this':
        let artist = search;
        if(artist === undefined) {
            artist = "Ace of Base"
        }
        searchConcert(artist);
        break;

    case 'spotify-this-song':
        console.log("Search Song");
        searchSong(search);
        break;

    case 'movie-this':
        console.log("Search Movie");
        let movie = search;
        if(movie === undefined) {
            movie = "Mr. Nobody"
        }
        searchMovie(movie);
        break;
        
    case 'do-what-it-says':
        console.log("Search File");
        searchFile(search);
        break;
}

function searchConcert(artist) {
    let combineArtist = artist.split(' ').join('+');

    var queryUrl = "https://rest.bandsintown.com/artists/" + combineArtist + "/events?app_id=codingbootcamp";

    axios
        .get(queryUrl)
        .then(function(response) {
            let showData = "Concerts for: " + artist + "\n\n";

            for (const concert of response.data) {
                showData += [
                    "Name of the Venue: " + concert.venue.name,
                    "Venue Location: " + concert.venue.city + ", " + concert.venue.country,
                    "Date of the Event: " + moment(concert.datetime).format("MM/DD/YYYY"),
                    divider
                ].join("\n\n");
            }
            
            console.log(showData);
        })
        .catch(function(error) {
            console.log(error);
        })
}

function searchMovie(movie) {
    let combinedMovie = movie.split(' ').join('+');

    var queryUrl = "http://www.omdbapi.com/?t=" + combinedMovie + "&y=&plot=short&apikey=trilogy";
    console.log(queryUrl);

    axios
        .get(queryUrl)
        .then(function(response) {
            let showData = "Movie: " + movie + "\n\n";
            console.log(response.data);
            // for (const concert of response.data) {
            //     showData += [
            //         "Name of the Venue: " + concert.venue.name,
            //         "Venue Location: " + concert.venue.city + ", " + concert.venue.country,
            //         "Date of the Event: " + moment(concert.datetime).format("MM/DD/YYYY"),
            //         divider
            //     ].join("\n\n");
            // }
            
            console.log(showData);
        })
        .catch(function(error) {
            console.log(error);
        })
}