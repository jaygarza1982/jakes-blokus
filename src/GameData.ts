interface Player {
    id: string;
    color: string;
}

interface Block {
    blockId: string;
    playerId: string;
    shape: number[][];
    x: number;
    y: number;
}

interface GameData {
    blocks: Block[];
    players: Player[];
}

export type {GameData, Block};
