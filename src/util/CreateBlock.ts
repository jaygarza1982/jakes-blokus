import { GameData, Player } from '../GameData';
import { v4 as uuid } from 'uuid';

const createPlayerBlock = (g: GameData, player: Player, shape: number[][], x: number, y: number, blockNumber: number): GameData => {
  // Swap selected block with new selected block if one already exists
  // Do not allow multiple selected blocks
  const placedBlocks = g.blocks.filter(b => !b.selected);

  const selectedBlock = g.blocks.find(b => b.selected);

  const ourPlayer = g?.players?.find(p => p.id == player.id);

  return {
    // Append our player if not found
    players: ourPlayer ? g.players : g?.players?.concat([player]),
    blocks: [...placedBlocks, {
      blockId: uuid(),
      blockNumber: blockNumber,
      playerId: player.id,
      shape: shape,
      // Keep selected block in same position if we have a selected block already
      x: selectedBlock?.x ?? x,
      y: selectedBlock?.y ?? y,
      selected: true
    }]
  }
}

export default createPlayerBlock;
