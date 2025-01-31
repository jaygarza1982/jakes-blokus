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
    "blocks": [
        {
            "blockId": "1",
            "playerId": "Player 1",
            "shape": [
                [
                    0,
                    0
                ],
                [
                    1,
                    0
                ],
                [
                    1,
                    1
                ]
            ],
            "x": 0,
            "y": 0,
            selected: true
        },
        {
            "blockId": "2",
            "playerId": "Player 2",
            "shape": [
                [
                    0,
                    0
                ],
                [
                    1,
                    0
                ],
                [
                    1,
                    1
                ],
                [
                    2,
                    0
                ]
            ],
            "x": 200,
            "y": 200,
            selected: false
        },
        {
            "blockId": "3",
            "playerId": "Player 1",
            "shape": [
                [
                    0,
                    0
                ],
                [
                    1,
                    1
                ],
                [
                    2,
                    2
                ]
            ],
            "x": 100,
            "y": 300,
            selected: false
        }
    ]
}
});
