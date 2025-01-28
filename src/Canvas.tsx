import React from 'react';
import Shape from './Shape';
import Grid from './Grid';
import GameData from './GameData';

interface GameDataProps {
  gameData: GameData;
}

const Canvas: React.FC<GameDataProps> = ({ gameData }) => {
  const gridSize = 50;
  const width = 500;
  const height = 500;

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
            color={gameData.players.find(p => p.id == b.playerId)?.color ?? '#fff'}
          />
        })
      }
    </svg>
  );
};

export default Canvas;