import { atom } from "recoil";
import { GameData } from "../GameData";

export const GameDataAtom = atom<GameData>({
  key: 'gameData',
  default: {
    "players": [
        {
            "id": "Player 1",
            "color": "#0ff"
        },
        {
            "id": "Player 2",
            "color": "#ff0"
        }
    ],
    "blocks": []
}
});
