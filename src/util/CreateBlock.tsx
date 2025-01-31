import { GameData } from '../GameData';
import { v4 as uuid } from 'uuid';

const createPlayerBlock = (g: GameData, playerId: string, shape: number[][], x: number, y: number) => {
  return {
    players: g.players,
    blocks: [...g.blocks, {
      blockId: uuid(),
      playerId: playerId,
      shape: shape,
      x: x,
      y: y
    }]
  }
}

export default createPlayerBlock;
