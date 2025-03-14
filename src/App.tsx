import React, { useEffect } from 'react';
import Canvas from './Canvas';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { GameDataAtom } from './atoms/GameData';
import placePlayerBlock from './util/PlaceBlock';
import './App.css'
import BlockSelectButton from './BlockSelectButton';
import { PlayerInfo } from './atoms/PlayerInfo';
import Scoreboard from './Scoreboard';
import GameQuery from './GameQuery';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import { SelectedBlockAtom } from './atoms/SelectedBlock';

const App: React.FC = () => {
  const playerInfo = useRecoilValue(PlayerInfo);
  const [selectedBlock, setSelectedBlock] = useRecoilState(SelectedBlockAtom);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the pregame info screen if the player info has not been filled out yet
    playerInfo.id === '' && navigate(`/pregame-info/${params.gameId || 'NA'}`);
  }, []);

  const placeSelectedBlock = useRecoilCallback(({ set, snapshot }) => async () => {
    // Get the current state before the update
    const gameData = await snapshot.getPromise(GameDataAtom);
    const [newGameData, updated] = placePlayerBlock(gameData, playerInfo, selectedBlock);

    // If we did not receive a valid game update, do nothing
    if (!updated) return;

    console.log('New game state', newGameData);

    set(GameDataAtom, newGameData);

    try {
      await axios.post(`/api/game/${params?.gameId || 'NA'}`, newGameData);
    } catch (error) {
      console.log('Could not post game state to server', error);
    }

    set(SelectedBlockAtom, s => ({ ...s, selected: false }));
  });

  const rotateBlockLeft = () => {
    const newBlock = selectedBlock.shape.map(([x, y]) => [y, -x]);
    setSelectedBlock(s => ({ ...s, shape: newBlock }));
  }

  const rotateBlockRight = () => {
    const newBlock = selectedBlock.shape.map(([x, y]) => [-y, x]);
    setSelectedBlock(s => ({ ...s, shape: newBlock }));
  }

  const mirrorBlockX = () => {
    const newBlock = selectedBlock.shape.map(([x, y]) => [-x, y]);
    setSelectedBlock(s => ({ ...s, shape: newBlock }));
  }

  const mirrorBlockY = () => {
    const newBlock = selectedBlock.shape.map(([x, y]) => [x, -y]);
    setSelectedBlock(s => ({ ...s, shape: newBlock }));
  }

  return (
    <div className='game-container'>
      <GameQuery gameId={params?.gameId || 'NA'} />
      <Scoreboard />
      <Canvas />
      <br />
      <div className='block-button-grid'>
        <button className='rotate-block-button' style={{ backgroundColor: `hsl(${playerInfo.hue}, 100%, 50%)` }} onClick={rotateBlockLeft}>Rotate Left</button>
        <button className='place-block-button' style={{ backgroundColor: `hsl(${playerInfo.hue}, 100%, 50%)` }} onClick={placeSelectedBlock}>Place Block</button>
        <button className='rotate-block-button' style={{ backgroundColor: `hsl(${playerInfo.hue}, 100%, 50%)` }} onClick={rotateBlockRight}>Rotate Right</button>
      </div>
      <br />
      <div className='block-button-grid'>
        {/* Mirror block buttons */}
        <button className='mirror-block-button' style={{ backgroundColor: `hsl(${playerInfo.hue}, 100%, 50%)` }} onClick={mirrorBlockX}>Mirror X</button>
        <button className='mirror-block-button' style={{ backgroundColor: `hsl(${playerInfo.hue}, 100%, 50%)` }} onClick={mirrorBlockY}>Mirror Y</button>
      </div>
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
    </div>
    
  );
};

export default App;