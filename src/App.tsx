import React from 'react';
import Canvas from './Canvas';
import { useSetRecoilState } from 'recoil';
import { GameDataAtom } from './atoms/GameData';
import createPlayerBlock from './util/CreateBlock';

const App: React.FC = () => {
  const setGameData = useSetRecoilState(GameDataAtom)

  const addPlayerBlock = (playerId: string, shape: number[][]) => {
    const x = 0;
    const y = 0;

    return () => {
      setGameData(g => {
        return createPlayerBlock(g, playerId, shape, x, y);
      })
    }
  }

  return (
    <>
      <Canvas />
      <br />
      <button onClick={addPlayerBlock('Player 1', [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2]])}>Add player 1 L block</button>
      <button onClick={addPlayerBlock('Player 1', [])}>Add player 1 T block</button>
      <button onClick={addPlayerBlock('Player 2', [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2]])}>Add player 2 L block</button>
      <button onClick={addPlayerBlock('Player 2', [])}>Add player 2 T block</button>
    </>
  );
};

export default App;