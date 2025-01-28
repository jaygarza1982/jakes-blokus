import React, { useState } from 'react';
import Canvas from './Canvas';
import GameData from './GameData';

const App: React.FC = () => {
  const [gameData, setGameData] = useState<GameData>({
    players: [
      { id: 'Player 1', color: '#0ff' },
      { id: 'Player 2', color: '#ff0' }
    ],
    blocks: [
      {
        playerId: 'Player 1',
        shape: [
          [0, 0],
          [1, 0],
          [1, 1]
        ]
      },
      {
        playerId: 'Player 2',
        shape: [
          [0, 0],
          [1, 0],
          [1, 1],
          [2, 0]
        ]
      }
    ]
  });

  const addPlayerBlock = (playerId: string) => {
    return () => {
      setGameData(g => {
        return {
          players: g.players,
          blocks: [...g.blocks, {
            playerId: playerId,
            shape: [
              [0, 0],
              [1, 1],
              [2, 2]
            ]
          }]
        }
      })
    }
  }

  return (
    <>
      <Canvas gameData={gameData}/>
      <br />
      <button onClick={addPlayerBlock('Player 1')}>Add player 1 block</button>
      <button onClick={addPlayerBlock('Player 2')}>Add player 2 block</button>
    </>
  );
};

export default App;