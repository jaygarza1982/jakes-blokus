import { atom } from "recoil";
import { GameData } from "../GameData";

export const GameDataAtom = atom<GameData>({
  key: 'gameData',
  default: {
    "players": [],
    "blocks": []
}
});
