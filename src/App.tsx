import React from 'react';
import Canvas from './Canvas';
import { useSetRecoilState } from 'recoil';
import { GameDataAtom } from './atoms/GameData';
import createPlayerBlock from './util/CreateBlock';
import { GameData } from './GameData';
import placePlayerBlock from './util/PlaceBlock';
import "./App.css"

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
      <br />
      <img className='block-img' src='/1.png' onClick={addPlayerBlock('Player 1', [[0, 0]])} />
      <img className='block-img' src='/2.png' onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0]])} />
      <img className='block-img' src='/3.png' onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0], [1, 1]])} />
      <img className='block-img' src='/4.png' onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0], [2, 0]])} />
      <img className='block-img' src='/5.png' onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0], [1, 1], [2, 1]])} />
      <img className='block-img' src='/6.png' onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0], [0, 1], [1, 1]])} />
      <img className='block-img' src='/7.png' onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0], [2, 0], [1, 1]])} />
      <img className='block-img' src='/8.png' onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0], [2, 0], [2, 1]])} />
      <img className='block-img' src='/9.png' onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0], [2, 0], [3, 0]])} />
      <img className='block-img' src='/10.png' onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]])} />
      <img className='block-img' src='/11.png' onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0], [2, 0], [3, 0], [3, 1]])} />
      <img className='block-img' src='/12.png' onClick={addPlayerBlock('Player 1', [[0, 0], [0, 1], [0, 2], [-1, 2], [-1, 3]])} />
      <img className='block-img' src='/13.png' onClick={addPlayerBlock('Player 1', [[0, 0], [0, 1], [0, 2], [-1, 1], [-1, 2]])} />
      <img className='block-img' src='/14.png' onClick={addPlayerBlock('Player 1', [[0, 0], [0, 1], [0, 2], [-1, 2], [-2, 2]])} />
      {/* TODO: Translate 15 down and right */}
      <img className='block-img' src='/15.png' onClick={addPlayerBlock('Player 1', [[0, 0], [0, -1], [1, -1], [1, -2], [2, -2]])} />
      <img className='block-img' src='/16.png' onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0], [1, -1], [1, -2], [2, -2]])} />
      <img className='block-img' src='/17.png' onClick={addPlayerBlock('Player 1', [[2, 0], [1, 0], [1, -1], [1, -2], [2, -2]])} />
      <img className='block-img' src='/18.png' onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0], [2, 0], [2, 1], [2, -1]])} />
      <img className='block-img' src='/19.png' onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0], [1, -1], [1, -2], [2, -1]])} />
      <img className='block-img' src='/20.png' onClick={addPlayerBlock('Player 1', [[0, 0], [-1, 0], [1, 0], [0, -1], [0, 1]])} />
      <img className='block-img' src='/21.png' onClick={addPlayerBlock('Player 1', [[0, 0], [1, 0], [2, 0], [3, 0], [1, -1]])} />
    </>
  );
};

export default App;