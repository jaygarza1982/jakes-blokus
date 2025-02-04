import { Block, GameData } from '../GameData';

const gridSize = 50;
const width = 500;
const height = 500;

const getBlockGridPositions = (block: Block): number[][] => {
  return block.shape.map(
    p => [(p[0] * gridSize) + block.x, (p[1] * gridSize) + block.y]
  );
}

const placingBlockMustBeDiagonalOfAnotherOwnedBlock = (placedBlocks: Block[], block: Block): boolean => {
  const ourPlacedBlocks = placedBlocks.filter(b => b.playerId == block.playerId);

  // We do not own any blocks yet, so we pass this check
  if (ourPlacedBlocks.length == 0) return true;

  const placingPositionStrings: string[] = getBlockGridPositions(block).map(i => JSON.stringify(i));

  for (let i = 0; i < ourPlacedBlocks.length; i++) {
    const currentPlacedPositions = getBlockGridPositions(ourPlacedBlocks[i]);
    
    // All positions diagonal of current block. Make these values unique
    const currentDiagPositions: string[] = Array.from(new Set(currentPlacedPositions.map(p => [
      [p[0] + gridSize, p[1] + gridSize],
      [p[0] - gridSize, p[1] - gridSize],
      [p[0] - gridSize, p[1] + gridSize],
      [p[0] + gridSize, p[1] - gridSize]
    ]).flat().map(i => JSON.stringify(i))));

    const currentAndPlacingPositions = currentDiagPositions.concat(placingPositionStrings);

    // If our placing is contained in diagonal positions, we are valid for this check
    if (new Set(currentAndPlacingPositions).size != currentAndPlacingPositions.length) return true;
  }

  return false;
}

const placingBlockNotTouchingOwnedBlocks = (placedBlocks: Block[], block: Block): boolean => {
  const ourPlacedBlocks = placedBlocks.filter(b => b.playerId == block.playerId);
  
  const placingPositionStrings: string[] = getBlockGridPositions(block).map(i => JSON.stringify(i));

  for (let i = 0; i < ourPlacedBlocks.length; i++) {
    const currentPlacedPositions = getBlockGridPositions(ourPlacedBlocks[i]);
    
    // All positions up, down, left, right of current block. Make these values unique
    const currentTouchingPositions: string[] = Array.from(new Set(currentPlacedPositions.map(p => [
      [p[0] + gridSize, p[1]],
      [p[0] - gridSize, p[1]],
      [p[0], p[1] + gridSize],
      [p[0], p[1] - gridSize]
    ]).flat().map(i => JSON.stringify(i))));

    const currentAndPlacingPositions = currentTouchingPositions.concat(placingPositionStrings);
    
    // Works because touching is unique, adding our new placing should yield unique as well
    if (new Set(currentAndPlacingPositions).size != currentAndPlacingPositions.length) return false;
  }

  return true;
}

// Checks for in game bounds
// Checks that not touching same player-owned blocks in directly left, right, up, and down
// Placing block must touch diagonal player-owned block at least once
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

  return allInBounds &&
  newBlockNotOverlappingExisting &&
  placingBlockNotTouchingOwnedBlocks(placedBlocks, block) &&
  placingBlockMustBeDiagonalOfAnotherOwnedBlock(placedBlocks, block);
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
      blockNumber: block?.blockNumber || 0,
      playerId: block?.playerId || '',
      selected: false,
      shape: block?.shape || [],
      x: block?.x || 0,
      y: block?.y || 0
    }]
  }
}

export default placePlayerBlock;
