import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';
import { useRecoilState, useRecoilValue } from 'recoil';
import { GameDataAtom } from './atoms/GameData';
import { Block } from './GameData';
import { SelectedBlockAtom } from './atoms/SelectedBlock';

interface TileProps {
  size: number;
  block: Block;
  selected: boolean;
}

interface ShapeProps {
  selected: boolean;
  block: Block;
  size: number;
  gridSize: number;
}

const Tiles: React.FC<TileProps> = ({ size, block, selected }) => {
  const gameData = useRecoilValue(GameDataAtom);
  const color = gameData?.players?.find(p => p.id == block.playerId)?.hue ?? 0;

  return (
    <g>
      {block.shape.map((n, i) => (
        <rect key={`tile-${block.blockId}-${i}`} width={size} height={size} x={size * n[0]} y={size * n[1]} fill={selected ? '#fff' : `hsl(${color}, 100%, 50%)` } />
      ))}
    </g>
  );
};

const Shape: React.FC<ShapeProps> = (props: ShapeProps) => {
  const [, setSelectedBlock] = useRecoilState(SelectedBlockAtom);

  // Not a source of truth position. This is needed for rendering the drag
  // Logic will be done later for setting the game state, which would be the source of truth
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: props.block.x, y: props.block.y });
  const shapeRef = useRef<SVGGElement>(null);

  const snapToGrid = (x: number, y: number): { x: number; y: number } => ({
    x: Math.round(x / props.gridSize) * props.gridSize,
    y: Math.round(y / props.gridSize) * props.gridSize,
  });

  useEffect(() => {
    // Only allow movement of selected blocks
    if (!props.selected) return;

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

            setSelectedBlock(s => {
              const newSelectedBlock = {
                ...s,
                x: snapped.x,
                y: snapped.y
              }

              console.log('New selected block', newSelectedBlock);

              return newSelectedBlock
            });

            return snapped
          });
        });

      d3.select(shapeRef.current).call(drag); 
    }

    return () => {
      d3.select(shapeRef.current).on('.drag', null);
    }
  }, []);

  return (
    <g
      ref={shapeRef}
      transform={`translate(${position.x}, ${position.y})`}
    >
      <Tiles size={props.size} block={props.block} selected={props.selected} />
    </g>
  );
};

export default Shape;