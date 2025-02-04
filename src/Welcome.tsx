import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { v4 as uuid } from 'uuid';
import { Player } from './GameData';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const [playerInfo, setPlayerInfo] = useState<Player>(() => {
    const storedPlayerInfo = localStorage.getItem('playerInfo');
    return storedPlayerInfo ? JSON.parse(storedPlayerInfo) : { id: '', color: 0 };
  });

  useEffect(() => {
    localStorage.setItem('playerInfo', JSON.stringify(playerInfo));
  }, [playerInfo]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPlayerInfo((prevInfo) => ({
      ...prevInfo,
      [name]: name === 'color' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(`/game/${uuid()}`);
  };

  const hueColor = `hsl(${playerInfo.hue}, 100%, 50%)`;

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px' }}>
        <label htmlFor='displayName'>Display Name</label>
        <input
          type='text'
          id='displayName'
          name='displayName'
          value={playerInfo.id}
          onChange={handleChange}
          required
        />

        <label htmlFor='hue'>Hue</label>
        <input
          type='range'
          id='hue'
          name='hue'
          value={playerInfo.hue}
          onChange={handleChange}
          min='0'
          max='360'
          step='1'
          required
        />
        <div style={{ backgroundColor: hueColor, width: '50px', height: '50px', border: '1px solid black' }} />

        <button type='submit'>Host</button>
      </form>
    </div>
  );
};

export default Welcome;