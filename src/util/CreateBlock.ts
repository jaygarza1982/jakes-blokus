import { GameData } from '../GameData';
import { v4 as uuid } from 'uuid';

const createPlayerBlock = (g: GameData, playerId: string, shape: number[][], x: number, y: number): GameData => {
  // Do not allow players to create more than 1 block at a time
  if (g.blocks.find(b => b.selected)) return g;

  return {
    players: g.players,
    blocks: [...g.blocks, {
      blockId: uuid(),
      playerId: playerId,
      shape: shape,
      x: x,
      y: y,
      selected: true
    }]
  }
}

export default createPlayerBlock;
