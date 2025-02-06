interface Player {
    id: string;
    hue: number;
}

interface Block {
    blockId: string;
    blockNumber: number;
    playerId: string;
    shape: number[][];
    x: number;
    y: number;
}

interface SelectedBlock {
    playerId: string;
    blockNumber: number;
    shape: number[][];
    x: number;
    y: number;
    selected: boolean;
}

interface GameData {
    blocks: Block[];
    players: Player[] | undefined;
}

export type {GameData, Block, Player, SelectedBlock};
