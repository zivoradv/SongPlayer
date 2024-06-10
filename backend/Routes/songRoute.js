const express = require("express")
const { createSong, getSongs, getSong, deleteSong, updateSong, getLink} = require("../Controllers/songController")
const router = express.Router()

router.post("/songs/" , createSong)

router.get("/songs/" , getSongs)

router.get("/songs/:id" , getSong)

router.delete("/songs/:id" , deleteSong)

router.put("/songs/:id" , updateSong)

router.get("/link/:id" , getLink)

module.exports = router