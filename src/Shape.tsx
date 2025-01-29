import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { GameDataAtom } from './atoms/GameData';
import { Block } from './GameData';

interface TileProps {
  size: number;
  block: Block;
}

interface ShapeProps {
  block: Block;
  size: number;
  gridSize: number;
}

const Tiles: React.FC<TileProps> = ({ size, block }) => {
  const gameData = useRecoilValue(GameDataAtom);
  const color = gameData.players.find(p => p.id == block.playerId)?.color ?? '#fff';

  return (
    <g>
      {block.shape.map((n, i) => (
        <rect key={`tile-${block.blockId}-${i}`} width={size} height={size} x={size * n[0]} y={size * n[1]} fill={color} />
      ))}
    </g>
  );
};

const Shape: React.FC<ShapeProps> = (props: ShapeProps) => {
  const setGameData = useSetRecoilState(GameDataAtom);

  // Not a source of truth position. This is needed for rendering the drag
  // Logic will be done later for setting the game state, which would be the source of truth
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: props.block.x, y: props.block.y });
  const shapeRef = useRef<SVGGElement>(null);

  const snapToGrid = (x: number, y: number): { x: number; y: number } => ({
    x: Math.round(x / props.gridSize) * props.gridSize,
    y: Math.round(y / props.gridSize) * props.gridSize,
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
          setPosition(prevPos => {
            const snapped = {
              x: snapToGrid(prevPos.x, prevPos.y).x,
              y: snapToGrid(prevPos.x, prevPos.y).y,
            }

            // Get shape position on map and print
            const shapeGridPositions = props.block.shape.map(
              p => [(p[0] * props.gridSize) + snapped.x, (p[1] * props.gridSize) + snapped.y]
            );
            console.log(shapeGridPositions);

            setGameData(g => {
              console.log(g.blocks);
              const blocks = [...g.blocks.filter(b => b.blockId != props.block.blockId)];
              const newBlocks = [...blocks, {
                ...props.block,
                x: snapped.x,
                y: snapped.y
              }]
              
              console.log('new blocks', newBlocks);

              const newState = {
                players: g.players,
                blocks: newBlocks
              }

              console.log('new state', newState);
              
              return newState;
            });

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
      <Tiles size={props.size} block={props.block} />
    </g>
  );
};

export default Shape;