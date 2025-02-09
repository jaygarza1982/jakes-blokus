import React from 'react';
import Shape from './Shape';
import Grid from './Grid';
import { useRecoilValue } from 'recoil';
import { GameDataAtom } from './atoms/GameData';
import { SelectedBlockAtom } from './atoms/SelectedBlock';
import { PlayerInfo } from './atoms/PlayerInfo';

const Canvas: React.FC = () => {
  const gridSize = 50;
  const width = 1000;
  const height = 1000;

  const gameData = useRecoilValue(GameDataAtom);
  const selectedBlock = useRecoilValue(SelectedBlockAtom);
  const playerInfo = useRecoilValue(PlayerInfo);

  return (
    <svg width={width} height={height}>
      <Grid width={width} height={height} gridSize={gridSize} />
      {
        gameData.blocks.map(b => {
          return <Shape
            key={`block-${b.blockId}`}
            gridSize={gridSize}
            size={gridSize}
            block={b}
            selected={false}
          />
        })
      }
      {
        selectedBlock.selected ?
        <Shape
          key={`block-selected`}
          gridSize={gridSize}
          size={gridSize}
          block={{
            blockId: 'selected',
            blockNumber: selectedBlock.blockNumber,
            playerId: playerInfo.id,
            shape: selectedBlock.shape,
            x: selectedBlock.x,
            y: selectedBlock.y
          }}
          selected={true}
        /> : <></>
      }
    </svg>
  );
};

export default Canvas;