interface Player {
    id: string;
    color: string;
}

interface Block {
    blockId: string;
    blockNumber: number;
    playerId: string;
    shape: number[][];
    x: number;
    y: number;
    selected: boolean;
}

interface GameData {
    blocks: Block[];
    players: Player[];
}

export type {GameData, Block};
