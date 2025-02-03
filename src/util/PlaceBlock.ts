import { Block, GameData } from '../GameData';

const gridSize = 50;
const width = 500;
const height = 500;

const getBlockGridPositions = (block: Block): number[][] => {
  return block.shape.map(
    p => [(p[0] * gridSize) + block.x, (p[1] * gridSize) + block.y]
  );
}

// Checks for in game bounds
// TODO: Check that not touching same player-owned blocks in directly left, right, up, and down
// TODO: Placing block must touch diagonal player-owned block at least once
const canPlaceBlock = (placedBlocks: Block[], block: Block): boolean => {
  const blockGridPositions = getBlockGridPositions(block);

  const positionsInBounds = blockGridPositions.map(p => !(p[0] < 0 || p[0] >= width || p[1] < 0 || p[1] >= height));
  const allInBounds = positionsInBounds.every(b => b === true);

  // Check that blocks do not overlap
  // Make a list of strings that contain positions of all placed blocks and block we are placing
  // The positions should all be unique. If they are not, we have overlap
  const blockPositionStrings: string[] = blockGridPositions.map(i => JSON.stringify(i));
  const placedPositionStrings: string[] = placedBlocks.map(b => getBlockGridPositions(b)).flat().map(i => JSON.stringify(i));
  const allPositionStrings = placedPositionStrings.concat(blockPositionStrings);  
  const newBlockNotOverlappingExisting = allPositionStrings.length == new Set(allPositionStrings).size;

  return allInBounds && newBlockNotOverlappingExisting;
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
