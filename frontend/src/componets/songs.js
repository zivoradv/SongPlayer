import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaPlus, FaCheck, FaPlay } from 'react-icons/fa';

function Songs({ song, i, onSongAdded, onSongPlayed }) {
  const [isAddedToPlaylist, setIsAddedToPlaylist] = useState(song.playlist === '1');
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


  const addToPlaylist = async () => {
    try {
      if (isAddedToPlaylist) {
        toast.info('Song is already added to the playlist');
        return;
      }

      await axios.put(`http://localhost:5000/api/songs/${song._id}`, {
        playlist: '1',
      });
      onSongAdded(song._id);
      setIsAddedToPlaylist(true);
      toast.success('Song added to playlist successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCheckClick = () => {
    toast.info('Song is already added to the playlist');
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
        {isAddedToPlaylist ? (
          <span onClick={handleCheckClick} style={{ cursor: 'pointer' }}>
            <FaCheck className='button-hover' />
          </span>
        ) : (
          <span onClick={addToPlaylist} style={{ cursor: 'pointer' }}>
            <FaPlus className='button-hover' />
          </span>
        )}
        <span onClick={playSong} style={{ cursor: 'pointer' }}>
          <FaPlay className='button-hover' />
        </span>
      </div>
    </div>
  );
}

export default Songs;
