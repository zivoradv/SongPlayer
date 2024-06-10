import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Songs from './songs';
import './songList.css';
import Playlist from './playlist';
import Preview from './preview';

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [ playedSong, setPlayedSong] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get('http://localhost:5000/api/songs');
        setSongs(data);
      } catch (error) {
        toast.error(error.message);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = songs;

    if (showPlaylist) {
      filtered = filtered.filter((song) => song.playlist === '1');
    }

    if (searchQuery) {
      filtered = filtered.filter((song) =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredSongs(filtered);
  }, [showPlaylist, songs, searchQuery]);

  const toggleShowPlaylist = async () => {
    setShowPlaylist(true);
    try {
      const { data } = await axios.get('http://localhost:5000/api/songs');
      setSongs(data);
    } catch (error) {
      console.error('Error fetching updated songs:', error);
    }
  };

  const handleSongRemoved = (songId) => {
    const updatedSongs = songs.filter((song) => song._id !== songId);
    setSongs(updatedSongs);
  };

  const handleSongAdded = async (songId) => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/songs');
      setSongs(data);
    } catch (error) {
      console.error('Error fetching updated songs:', error);
    }
  };

  const handleSongPlayed = async (link) => {
    setPlayedSong(link)
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <div className="view-selection">
        <button
          className={`view-button ${!showPlaylist ? 'active-button' : ''}`}
          onClick={() => setShowPlaylist(false)} 
        >
          Songs
        </button>
        <button
          className={`view-button ${showPlaylist ? 'active-button' : ''}`}
          onClick={toggleShowPlaylist}
        >
          Playlist
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
          placeholder="Search songs by title"
        />
      </div>

      <div className="scroll-container">
        <div className="Container">
          {filteredSongs.map((song, i) => (
            showPlaylist ? (
              <Playlist key={song._id} song={song} i={i} onSongRemoved={handleSongRemoved} onSongPlayed={handleSongPlayed}/>
            ) : (
              <Songs key={song._id} song={song} i={i} onSongAdded={handleSongAdded} onSongPlayed={handleSongPlayed} />
            )
          ))}
        </div>
        <div className='Preview'>
          <Preview link={playedSong} />
        </div>
      </div>

    </div>
  );
};

export default SongList;
