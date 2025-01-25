import React, { useRef, useState, useEffect } from 'react';

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
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const [isDragging, setIsDragging] = useState(false);
  const [prevMousePosition, setPrevMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 }); 
  const shapeRef = useRef<SVGGElement>(null);

  const snapToGrid = (x: number, y: number): {x: number, y: number} => {
    return {
      x: Math.round(x / gridSize) * gridSize,
      y: Math.round(y / gridSize) * gridSize
    }
  };

  const handleMouseUp = () => {
    setPosition((prevPosition) => {
      const { x, y } = snapToGrid(prevPosition.x, prevPosition.y);
      return { x, y };
    });

    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleMouseDown = (event: React.MouseEvent<SVGGElement>) => {
    setIsDragging(true);
    setPrevMousePosition({ x: event.clientX, y: event.clientY }); 
  };

  const handleMouseMove = (event: React.MouseEvent<SVGGElement>) => {
    if (!isDragging) return;

    const currentMousePosition = { x: event.clientX, y: event.clientY };
    const deltaX = currentMousePosition.x - prevMousePosition.x;
    const deltaY = currentMousePosition.y - prevMousePosition.y;

    setPosition({ x: position.x + deltaX, y: position.y + deltaY }); 
    setPrevMousePosition(currentMousePosition); 
  };

  return (
    <g
      ref={shapeRef}
      transform={`translate(${position.x}, ${position.y})`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      <Tiles shape={shape} size={size} />
    </g>
  );
};


export default Shape;