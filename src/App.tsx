import React from 'react';
import Canvas from './Canvas';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { GameDataAtom } from './atoms/GameData';
import { GameData } from './GameData';
import placePlayerBlock from './util/PlaceBlock';
import "./App.css"
import BlockSelectButton from './BlockSelectButton';
import { PlayerInfo } from './atoms/PlayerInfo';
import Scoreboard from './Scoreboard';

const App: React.FC = () => {
  const setGameData = useSetRecoilState<GameData>(GameDataAtom);
  const playerInfo = useRecoilValue(PlayerInfo);

  const placeSelectedBlock = () => {
    setGameData(g => {
      return placePlayerBlock(g, g.blocks.find(b => b.selected));
    })
  }

  return (
    <>
      <Scoreboard />
      <Canvas />
      <br />
      <button className='place-block-button' style={{ backgroundColor: `hsl(${playerInfo.hue}, 100%, 50%)` }} onClick={placeSelectedBlock}>Place Block</button>
      <br />
      <BlockSelectButton blockNumber={1}  player={playerInfo} blockShape={[[0, 0]]} />
      <BlockSelectButton blockNumber={2}  player={playerInfo} blockShape={[[0, 0], [1, 0]]} />
      <BlockSelectButton blockNumber={3}  player={playerInfo} blockShape={[[0, 0], [1, 0], [1, 1]]} />
      <BlockSelectButton blockNumber={4}  player={playerInfo} blockShape={[[0, 0], [1, 0], [2, 0]]} />
      <BlockSelectButton blockNumber={5}  player={playerInfo} blockShape={[[0, 0], [1, 0], [1, 1], [2, 1]]} />
      <BlockSelectButton blockNumber={6}  player={playerInfo} blockShape={[[0, 0], [1, 0], [0, 1], [1, 1]]} />
      <BlockSelectButton blockNumber={7}  player={playerInfo} blockShape={[[0, 0], [1, 0], [2, 0], [1, 1]]} />
      <BlockSelectButton blockNumber={8}  player={playerInfo} blockShape={[[0, 0], [1, 0], [2, 0], [2, 1]]} />
      <BlockSelectButton blockNumber={9}  player={playerInfo} blockShape={[[0, 0], [1, 0], [2, 0], [3, 0]]} />
      <BlockSelectButton blockNumber={10} player={playerInfo} blockShape={[[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]} />
      <BlockSelectButton blockNumber={11} player={playerInfo} blockShape={[[0, 0], [1, 0], [2, 0], [3, 0], [3, 1]]} />
      <BlockSelectButton blockNumber={12} player={playerInfo} blockShape={[[0, 0], [0, 1], [0, 2], [-1, 2], [-1, 3]]} />
      <BlockSelectButton blockNumber={13} player={playerInfo} blockShape={[[0, 0], [0, 1], [0, 2], [-1, 1], [-1, 2]]} />
      <BlockSelectButton blockNumber={14} player={playerInfo} blockShape={[[0, 0], [0, 1], [0, 2], [-1, 2], [-2, 2]]} />
      <BlockSelectButton blockNumber={15} player={playerInfo} blockShape={[[0, 2], [0, 1], [1, 1], [1, 0], [2, 0]]} />
      <BlockSelectButton blockNumber={16} player={playerInfo} blockShape={[[0, 0], [1, 0], [1, -1], [1, -2], [2, -2]]} />
      <BlockSelectButton blockNumber={17} player={playerInfo} blockShape={[[2, 0], [1, 0], [1, -1], [1, -2], [2, -2]]} />
      <BlockSelectButton blockNumber={18} player={playerInfo} blockShape={[[0, 0], [1, 0], [2, 0], [2, 1], [2, -1]]} />
      <BlockSelectButton blockNumber={19} player={playerInfo} blockShape={[[0, 0], [1, 0], [1, -1], [1, -2], [2, -1]]} />
      <BlockSelectButton blockNumber={20} player={playerInfo} blockShape={[[0, 0], [-1, 0], [1, 0], [0, -1], [0, 1]]} />
      <BlockSelectButton blockNumber={21} player={playerInfo} blockShape={[[0, 0], [1, 0], [2, 0], [3, 0], [1, -1]]} />
    </>
  );
};

export default App;