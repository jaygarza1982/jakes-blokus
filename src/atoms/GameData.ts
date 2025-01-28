import { atom } from "recoil";
import GameData from "../GameData";

export const GameDataAtom = atom<GameData>({
  key: 'gameData',
  default: {
    grid: new Map(),
    players: [
      { id: 'Player 1', color: '#0ff' },
      { id: 'Player 2', color: '#ff0' }
    ],
    blocks: [
      {
        playerId: 'Player 1',
        shape: [
          [0, 0],
          [1, 0],
          [1, 1]
        ]
      },
      {
        playerId: 'Player 2',
        shape: [
          [0, 0],
          [1, 0],
          [1, 1],
          [2, 0]
        ]
      }
    ]
  },
});
