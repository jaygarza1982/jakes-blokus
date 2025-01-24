import React, { useRef, useState, useEffect } from 'react';
import { select } from 'd3-selection';
import { drag } from 'd3-drag';

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

interface ShapeProps {
  size: number;
}

const Shape: React.FC<ShapeProps> = ({ size }) => {
  return (
    <g>
      <rect width={size} height={size} />
      <rect width={size} height={size} x={size} />
      <rect width={size} height={size} x={size} y={size} />
      <rect width={size} height={size} x={size*2} y={size*2} />
    </g>
  );
};

const App: React.FC = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const gridSize = 50;
  const shapeSize = 50;
  const width = 500;
  const height = 500;
  const shapeRef = useRef<SVGGElement>(null);

  const handleDrag = (event: any) => { 
    const [x, y] = snapToGrid(event.x, event.y);
    setPosition({ x, y });
  };

  const snapToGrid = (x: number, y: number): [number, number] => {
    return [
      Math.round(x / gridSize) * gridSize,
      Math.round(y / gridSize) * gridSize,
    ];
  };

  useEffect(() => {
    const svg = select(shapeRef.current?.parentNode); // Select the SVG element

    if (svg.empty()) return; 

    const dragBehavior = drag()
      .on('drag', handleDrag);

    svg.call(dragBehavior);

    return () => {
      svg.on('.drag', null); // Remove drag behavior on unmount
    };
  }, []); 

  return (
    <svg width={width} height={height}>
      <Grid width={width} height={height} gridSize={gridSize} />
      <g 
        ref={shapeRef} 
        transform={`translate(${position.x}, ${position.y})`} 
      >
        <Shape size={shapeSize} />
      </g>
    </svg>
  );
};

export default App;