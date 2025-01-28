interface Player {
    id: string;
    color: string;
}

interface Block {
    playerId: string;
    shape: number[][];
}

interface GameData {
    blocks: Block[];
    players: Player[];
    grid: Map<number[][], string>;
}

export default GameData;
