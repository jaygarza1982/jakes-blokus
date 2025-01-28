import React from 'react';
import Canvas from './Canvas';
import { useRecoilState } from 'recoil';
import { GameDataAtom } from './atoms/GameData';

const App: React.FC = () => {
  const [_, setGameData] = useRecoilState(GameDataAtom)

  const addPlayerBlock = (playerId: string) => {
    return () => {
      setGameData(g => {
        return {
          grid: g.grid,
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
      <Canvas />
      <br />
      <button onClick={addPlayerBlock('Player 1')}>Add player 1 block</button>
      <button onClick={addPlayerBlock('Player 2')}>Add player 2 block</button>
    </>
  );
};

export default App;