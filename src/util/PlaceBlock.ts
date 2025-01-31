import { Block, GameData } from '../GameData';

const placePlayerBlock = (g: GameData, block: Block | undefined): GameData => {
  // If we are given an undefined value we need to return original game state
  if (!block) return g;

  const allButGivenBlock = g.blocks.filter(b => b.blockId != block?.blockId);

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
