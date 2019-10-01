//Read and Set Environment variables
require("dotenv").config();

//Import keys
var keys = require("./keys.js");

//Access Spotify keys
var spotify = new Spotify(keys.spotify);