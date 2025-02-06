import React from 'react';
import Shape from './Shape';
import Grid from './Grid';
import { useRecoilValue } from 'recoil';
import { GameDataAtom } from './atoms/GameData';

const Canvas: React.FC = () => {
  const gridSize = 50;
  const width = 1000;
  const height = 1000;

  const gameData = useRecoilValue(GameDataAtom);

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
    </svg>
  );
};

export default Canvas;