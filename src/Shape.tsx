import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';

interface TileProps {
  shape: number[][];
  size: number;
  color: string;
}

interface ShapeProps {
  shape: number[][];
  size: number;
  gridSize: number;
  color: string;
}

const Tiles: React.FC<TileProps> = ({ shape, size, color }) => {
  return (
    <g>
      {shape.map((n) => (
        <rect width={size} height={size} x={size * n[0]} y={size * n[1]} fill={color} />
      ))}
    </g>
  );
};

const Shape: React.FC<ShapeProps> = ({ shape, size, gridSize, color }) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const shapeRef = useRef<SVGGElement>(null);

  const snapToGrid = (x: number, y: number): { x: number; y: number } => ({
    x: Math.round(x / gridSize) * gridSize,
    y: Math.round(y / gridSize) * gridSize,
  });

  useEffect(() => {
    if (shapeRef.current) {
      const drag = d3
        .drag<SVGGElement, unknown, unknown>()
        .on('start', () => {})
        .on('drag', (event) => {
          setPosition(p => {
            return {
              x: p.x + event.dx,
              y: p.y + event.dy,
            }
          });
        })
        .on('end', () => {
          setPosition(p => {
            return {
              x: snapToGrid(p.x, p.y).x,
              y: snapToGrid(p.x, p.y).y,
            }
          });
        });

      d3.select(shapeRef.current).call(drag); 
    }
  }, []);

  return (
    <g
      ref={shapeRef}
      transform={`translate(${position.x}, ${position.y})`}
    >
      <Tiles shape={shape} size={size} color={color} />
    </g>
  );
};

export default Shape;