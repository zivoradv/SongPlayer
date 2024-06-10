const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const songSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please enter a title"]
        },
        artist: {
            type: String,
            required: [true, "Please enter a artist"]
        },
        album: {
            type: String,
            required: [true, "Please add a album"]
        },
        genre: {
            type: String,
            required: [true, "Please add a genre"]
        },
        duration: {
            type: String,
            required: [true, "Please add a duration"]
        },
        playlist: {
            type: String,
            required: [true, "Please add a playlist"]
        },
        link: {
            type: String,
            required: [true, "Please add a link"]
        }
    }
) 

const Song = mongoose.model("song", songSchema)

module.exports = Song;