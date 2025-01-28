import React from 'react';
import Shape from './Shape';
import Grid from './Grid';
import { useRecoilValue } from 'recoil';
import { GameDataAtom } from './atoms/GameData';

const Canvas: React.FC = () => {
  const gridSize = 50;
  const width = 500;
  const height = 500;

  const gameData = useRecoilValue(GameDataAtom);

  return (
    <svg width={width} height={height}>
      <Grid width={width} height={height} gridSize={gridSize} />
      {
        gameData.blocks.map(b => {
          return <Shape
            key={JSON.stringify(b)}
            gridSize={gridSize}
            size={gridSize}
            shape={b.shape}
            playerId={b.playerId}
          />
        })
      }
    </svg>
  );
};

export default Canvas;