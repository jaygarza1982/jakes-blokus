import { Player, SelectedBlock } from '../GameData';

const createPlayerBlock = (player: Player, shape: number[][], x: number, y: number, blockNumber: number): SelectedBlock => {
  return {
    blockNumber: blockNumber,
    playerId: player.id,
    shape: shape,
    x: x,
    y: y,
    selected: true
  }
}

export default createPlayerBlock;
