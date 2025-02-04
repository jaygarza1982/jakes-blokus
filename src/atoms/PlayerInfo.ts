import { atom } from "recoil";
import { Player } from "../GameData";

export const PlayerInfo = atom<Player>({
    key: 'playerInfo',
    default: {
        id: JSON.parse(localStorage.getItem('playerInfo') ?? '{}')?.id ?? '',
        hue: JSON.parse(localStorage.getItem('playerInfo') ?? '{}')?.id ?? 0,
    }
});
