const Song = require('../Models/song')

const createSong = async (req, res) => {
    try {
        const song = await Song.create(req.body)
        res.status(200).json(song)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const getSongs = async (req, res) => {
    try {
        const song = await Song.find()
        res.status(200).json(song)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const getSong = async (req, res) => {
    try {
        const { id } = req.params
        const song = await Song.findById(id)
        res.status(200).json(song)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const getLink = async (req, res) => {
    try {
        const { id } = req.params
        let link;
        const song = await Song.findById(id)
        link = song.link
        res.status(200).json(link)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const deleteSong = async (req, res) => {
    try {
        const { id } = req.params
        const song = await Song.findByIdAndDelete(id)
        res.status(200).json("User deleted successfully")
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const updateSong = async (req, res) => {
    try{
        const { id } = req.params
        const song = await Song.findByIdAndUpdate(
            {_id: id},
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
        if(!song){
            res.status(404).json(`No task with that id.`)
        }
        res.status(200).json(song)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

module.exports = {
    createSong,
    getSongs,
    getSong,
    deleteSong,
    updateSong,
    getLink
}