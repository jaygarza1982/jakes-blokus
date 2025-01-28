import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';
import { useRecoilValue } from 'recoil';
import { GameDataAtom } from './atoms/GameData';

interface TileProps {
  shape: number[][];
  size: number;
  playerId: string;
}

interface ShapeProps {
  shape: number[][];
  size: number;
  gridSize: number;
  playerId: string;
}

const Tiles: React.FC<TileProps> = ({ shape, size, playerId }) => {
  const gameData = useRecoilValue(GameDataAtom);
  const color = gameData.players.find(p => p.id == playerId)?.color ?? '#fff';

  return (
    <g>
      {shape.map((n) => (
        <rect width={size} height={size} x={size * n[0]} y={size * n[1]} fill={color} />
      ))}
    </g>
  );
};

const Shape: React.FC<ShapeProps> = ({ shape, size, gridSize, playerId }) => {
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
            const snapped = {
              x: snapToGrid(p.x, p.y).x,
              y: snapToGrid(p.x, p.y).y,
            }

            // Get shape position on map and print
            console.log(shape.map(
              p => [(p[0] * gridSize) + snapped.x, (p[1] * gridSize) + snapped.y]
            ));

            return snapped
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
      <Tiles shape={shape} size={size} playerId={playerId} />
    </g>
  );
};

export default Shape;