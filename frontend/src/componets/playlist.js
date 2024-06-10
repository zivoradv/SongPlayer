import React, { useState } from 'react';
import axios from 'axios';
import { FaMinus, FaPlay } from 'react-icons/fa';
import { toast } from 'react-toastify';

function Playlist({ song, i, onSongRemoved, onSongPlayed }) {

  const [isPlaying, setIsPlaying] = useState(false);

  const playSong = async () => {
    setIsPlaying(!isPlaying);
    try {
      await axios.get(`http://localhost:5000/api/link/${song._id}`);
      onSongPlayed(song.link);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeFromPlaylist = async () => {
    try {
      await axios.put(`http://localhost:5000/api/songs/${song._id}`, {
        playlist: '0',
      });

      onSongRemoved(song._id);
      toast.success('Song successfully removed')
    } catch (error) {
      console.error('Error removing from playlist:', error);
    }
  };

  return (
    <div className="container">
      <div className='songs-container'>
        <p className=''>{i + 1}.</p>
        <p className="name">{song.title}</p>
        <p className="name">{song.artist}</p>
        <p className="name">{song.genre}</p>
        <p className="name">{song.duration}</p>
        <hr />
      <span onClick={removeFromPlaylist} style={{ cursor: 'pointer' }}>
        <FaMinus className='button-hover' />
      </span>
      <span onClick={playSong} style={{ cursor: 'pointer' }}>
        <FaPlay className='button-hover' />
      </span>
      </div>
    </div>
  );
}

export default Playlist;
