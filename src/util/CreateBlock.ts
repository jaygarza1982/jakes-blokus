import { GameData } from '../GameData';
import { v4 as uuid } from 'uuid';

const createPlayerBlock = (g: GameData, playerId: string, shape: number[][], x: number, y: number): GameData => {
  // Swap selected block with new selected block if one already exists
  // Do not allow multiple selected blocks
  const placedBlocks = g.blocks.filter(b => !b.selected);

  const selectedBlock = g.blocks.find(b => b.selected);

  return {
    players: g.players,
    blocks: [...placedBlocks, {
      blockId: uuid(),
      playerId: playerId,
      shape: shape,
      // Keep selected block in same position if we have a selected block already
      x: selectedBlock?.x ?? x,
      y: selectedBlock?.y ?? y,
      selected: true
    }]
  }
}

export default createPlayerBlock;
