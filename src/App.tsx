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
      
      {/* TODO: Images for blocks */}
      <button onClick={addPlayerBlock('Player 1', [[0, 0]])}>Add player 1 block</button>
      <br />

      <button onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0]])}>Add player 2 block</button>
      <br />

      <button onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0], [1, 1]])}>Add player 3 block</button>
      <button onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0], [2, 0]])}>Add player 4 block</button>
      <br />

      {/* TODO: Remake 5 to spec */}
      <button onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0], [1, 1], [2, 1]])}>Add player 5 block</button>

      <button onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0], [0, 1], [1, 1]])}>Add player 6 block</button>
      <button onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0], [2, 0], [1, 1]])}>Add player 7 block</button>
      <button onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0], [2, 0], [2, 1]])}>Add player 8 block</button>
      <button onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0], [2, 0], [3, 0]])}>Add player 9 block</button>
      <br />

      <button onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]])}>Add player 10 block</button>
      <button onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0], [2, 0], [3, 0], [3, 1]])}>Add player 11 block</button>
      <button onClick={addPlayerBlock('Player 1', [[0, 0], [0, 1], [0, 2], [-1, 2], [-1, 3]])}>Add player 12 block</button>
      <button onClick={addPlayerBlock('Player 1', [[0, 0], [0, 1], [0, 2], [-1, 1], [-1, 2]])}>Add player 13 block</button>
      
      
      <button onClick={addPlayerBlock('Player 1', [[0, 0], [0, 1], [0, 2], [-1, 2], [-2, 2]])}>Add player 14 block</button>

      {/* TODO: Translate 15 down and right */}
      <button onClick={addPlayerBlock('Player 1', [[0, 0], [0, -1], [1, -1], [1, -2], [2, -2]])}>Add player 15 block</button>
      
      <button onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0], [1, -1], [1, -2], [2, -2]])}>Add player 16 block</button>
      <button onClick={addPlayerBlock('Player 1', [[2, 0], [1, 0], [1, -1], [1, -2], [2, -2]])}>Add player 17 block</button>
      
      <button onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0], [2, 0], [2, 1], [2, -1]])}>Add player 18 block</button>
      
      <button onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0], [1, -1], [1, -2], [2, -1]])}>Add player 19 block</button>
      
      <button onClick={addPlayerBlock('Player 1', [[0, 0], [-1, 0], [1, 0], [0, -1], [0, 1]])}>Add player 20 block</button>
      
      <button onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0], [2, 0], [3, 0], [1, -1]])}>Add player 21 block</button>
    </>
  );
};

export default App;