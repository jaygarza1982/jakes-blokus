import React from 'react';
import Shape from './Shape';
import Grid from './Grid';

const App: React.FC = () => {
  const gridSize = 50;
  const width = 500;
  const height = 500;

  const shape1 = [
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 0]
  ]

  const shape2 = [
    [0, 0],
    [1, 0],
    [1, 1],
  ]

  return (
    <svg width={width} height={height}>
      <Grid width={width} height={height} gridSize={gridSize} />
      <Shape gridSize={gridSize} shape={shape2} size={gridSize} color={'#0ff'} />
      <Shape gridSize={gridSize} shape={shape1} size={gridSize} color={'#ff0'} />
    </svg>
  );
};

export default App;