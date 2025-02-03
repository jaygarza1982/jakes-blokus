import React from 'react';
import Canvas from './Canvas';
import { useSetRecoilState } from 'recoil';
import { GameDataAtom } from './atoms/GameData';
import { GameData } from './GameData';
import placePlayerBlock from './util/PlaceBlock';
import "./App.css"
import BlockSelectButton from './BlockSelectButton';

const App: React.FC = () => {
  const setGameData = useSetRecoilState<GameData>(GameDataAtom);

  const placeSelectedBlock = () => {
    setGameData(g => {
      return placePlayerBlock(g, g.blocks.find(b => b.selected));
    })
  }

  return (
    <>
      <Canvas />
      <br />
      <button onClick={placeSelectedBlock}>Place Block</button>
      <br />
      <BlockSelectButton blockNumber={1}  playerId='Player 1' blockShape={[[0, 0]]} />
      <BlockSelectButton blockNumber={2}  playerId='Player 1' blockShape={[[0, 0], [1, 0]]} />
      <BlockSelectButton blockNumber={3}  playerId='Player 1' blockShape={[[0, 0], [1, 0], [1, 1]]} />
      <BlockSelectButton blockNumber={4}  playerId='Player 1' blockShape={[[0, 0], [1, 0], [2, 0]]} />
      <BlockSelectButton blockNumber={5}  playerId='Player 1' blockShape={[[0, 0], [1, 0], [1, 1], [2, 1]]} />
      <BlockSelectButton blockNumber={6}  playerId='Player 1' blockShape={[[0, 0], [1, 0], [0, 1], [1, 1]]} />
      <BlockSelectButton blockNumber={7}  playerId='Player 1' blockShape={[[0, 0], [1, 0], [2, 0], [1, 1]]} />
      <BlockSelectButton blockNumber={8}  playerId='Player 1' blockShape={[[0, 0], [1, 0], [2, 0], [2, 1]]} />
      <BlockSelectButton blockNumber={9}  playerId='Player 1' blockShape={[[0, 0], [1, 0], [2, 0], [3, 0]]} />
      <BlockSelectButton blockNumber={10} playerId='Player 1' blockShape={[[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]} />
      <BlockSelectButton blockNumber={11} playerId='Player 1' blockShape={[[0, 0], [1, 0], [2, 0], [3, 0], [3, 1]]} />
      <BlockSelectButton blockNumber={12} playerId='Player 1' blockShape={[[0, 0], [0, 1], [0, 2], [-1, 2], [-1, 3]]} />
      <BlockSelectButton blockNumber={13} playerId='Player 1' blockShape={[[0, 0], [0, 1], [0, 2], [-1, 1], [-1, 2]]} />
      <BlockSelectButton blockNumber={14} playerId='Player 1' blockShape={[[0, 0], [0, 1], [0, 2], [-1, 2], [-2, 2]]} />
      <BlockSelectButton blockNumber={15} playerId='Player 1' blockShape={[[0, 2], [0, 1], [1, 1], [1, 0], [2, 0]]} />
      <BlockSelectButton blockNumber={16} playerId='Player 1' blockShape={[[0, 0], [1, 0], [1, -1], [1, -2], [2, -2]]} />
      <BlockSelectButton blockNumber={17} playerId='Player 1' blockShape={[[2, 0], [1, 0], [1, -1], [1, -2], [2, -2]]} />
      <BlockSelectButton blockNumber={18} playerId='Player 1' blockShape={[[0, 0], [1, 0], [2, 0], [2, 1], [2, -1]]} />
      <BlockSelectButton blockNumber={19} playerId='Player 1' blockShape={[[0, 0], [1, 0], [1, -1], [1, -2], [2, -1]]} />
      <BlockSelectButton blockNumber={20} playerId='Player 1' blockShape={[[0, 0], [-1, 0], [1, 0], [0, -1], [0, 1]]} />
      <BlockSelectButton blockNumber={21} playerId='Player 1' blockShape={[[0, 0], [1, 0], [2, 0], [3, 0], [1, -1]]} />
    </>
  );
};

export default App;