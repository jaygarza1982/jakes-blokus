import React from 'react';
import Shape from './Shape';

interface GridProps {
  width: number;
  height: number;
  gridSize: number;
}

const Grid: React.FC<GridProps> = ({ width, height, gridSize }) => {
  const gridLines: JSX.Element[] = [];

  for (let x = 0; x <= width; x += gridSize) {
    gridLines.push(
      <line 
        key={`v-${x}`} 
        x1={x} 
        y1={0} 
        x2={x} 
        y2={height} 
        stroke="#ccc" 
        strokeWidth={1} 
      />
    );
  }

  for (let y = 0; y <= height; y += gridSize) {
    gridLines.push(
      <line 
        key={`h-${y}`} 
        x1={0} 
        y1={y} 
        x2={width} 
        y2={y} 
        stroke="#ccc" 
        strokeWidth={1} 
      />
    );
  }

  return <g>{gridLines}</g>;
};

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