import React from 'react';
import Canvas from './Canvas';
import { useSetRecoilState } from 'recoil';
import { GameDataAtom } from './atoms/GameData';
import createPlayerBlock from './util/CreateBlock';
import { GameData } from './GameData';
import placePlayerBlock from './util/PlaceBlock';

const App: React.FC = () => {
  const setGameData = useSetRecoilState<GameData>(GameDataAtom);

  const addPlayerBlock = (playerId: string, shape: number[][]) => {
    const x = 0;
    const y = 0;

    return () => {
      setGameData(g => {
        return createPlayerBlock(g, playerId, shape, x, y);
      })
    }
  }

  const placeSelectedBlock = () => {
    setGameData(g => {
      return placePlayerBlock(g, g.blocks.find(b => b.selected == true));
    })
  }

  return (
    <>
      <Canvas />
      <br />
      <button onClick={placeSelectedBlock}>Place Block</button>
      
      <button onClick={addPlayerBlock('Player 1', [[0, 0]])}>Add player 1 block</button>
      <br />

      <button onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0]])}>Add player 1 block</button>
      <br />

      <button onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0], [1, 1]])}>Add player 1 block</button>
      <button onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0], [2, 0]])}>Add player 1 block</button>
      <br />

      <button onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0], [1, 1], [2, 1]])}>Add player Z block</button>
      <button onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0], [0, 1], [1, 1]])}>Add player cube block</button>
      <button onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0], [2, 0], [1, 1]])}>Add player 1 block</button>
      <button onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0], [2, 0], [2, 1]])}>Add player 1 block</button>
      <button onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0], [2, 0], [3, 0]])}>Add player 1 block</button>
      <br />

      {/* TODO: 5 piece blocks */}
    </>
  );
};

export default App;