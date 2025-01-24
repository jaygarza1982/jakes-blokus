import React, { useRef, useState, useEffect } from 'react';
import { select } from 'd3-selection';
import { drag } from 'd3-drag';

interface TileProps {
    shape: number[][];
    size: number;
}

interface ShapeProps {
    shape: number[][];
    size: number;
    gridSize: number;
}

const Tiles: React.FC<TileProps> = ({ shape, size }) => {
  return (
    <g>
      {
        shape.map(n => (
          <rect width={size} height={size} x={size * n[0]} y={size * n[1]} fill='#fff' />
        ))
      }
    </g>
  );
};

const Shape: React.FC<ShapeProps> = ({ shape, size, gridSize }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const shapeRef = useRef<SVGGElement>(null);

  const handleDrag = (event: any) => { 
    const [x, y] = snapToGrid(event.x, event.y);
    
    console.log(
      shape.map(p => [p[0] + x, p[1] + y])
    );

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
      <g 
        ref={shapeRef} 
        transform={`translate(${position.x}, ${position.y})`} 
      >
        <Tiles shape={shape} size={size} />
      </g>
  );
};

export default Shape;