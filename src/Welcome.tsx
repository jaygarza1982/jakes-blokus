import React from 'react';
import { useNavigate } from 'react-router';
import { v4 as uuid } from 'uuid';
import { PlayerInfo } from './atoms/PlayerInfo';
import { useRecoilState } from 'recoil';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const [playerInfo, setPlayerInfo] = useRecoilState(PlayerInfo);

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
        <label htmlFor='id'>Display Name</label>
        <input
          type='text'
          id='id'
          name='id'
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