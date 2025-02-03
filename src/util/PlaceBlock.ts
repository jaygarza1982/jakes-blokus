import { Block, GameData } from '../GameData';

// Checks for in game bounds
// TODO: Check that not touching same player-owned blocks in directly left, right, up, and down
// TODO: Placing block must touch diagonal player-owned block at least once
const canPlaceBlock = (placedBlocks: Block[], block: Block): boolean => {
  const gridSize = 50;
  const width = 500;
  const height = 500;

  const shapeGridPositions = block.shape.map(
    p => [(p[0] * gridSize) + block.x, (p[1] * gridSize) + block.y]
  );
  const positionsInBounds = shapeGridPositions.map(p => !(p[0] < 0 || p[0] >= width || p[1] < 0 || p[1] >= height));
  const allInBounds = positionsInBounds.every(b => b === true);
  
  return allInBounds;
}

const placePlayerBlock = (g: GameData, block: Block | undefined): GameData => {
  // If we are given an undefined value we need to return original game state
  if (!block) return g;

  const allButGivenBlock = g.blocks.filter(b => b.blockId != block?.blockId);

  // If we cannot place our block, return original state
  if (!canPlaceBlock(allButGivenBlock, block)) return g;

  return {
    players: g.players,
    blocks: [...allButGivenBlock, {
      blockId: block?.blockId || '',
      playerId: block?.playerId || '',
      selected: false,
      shape: block?.shape || [],
      x: block?.x || 0,
      y: block?.y || 0
    }]
  }
}

export default placePlayerBlock;
