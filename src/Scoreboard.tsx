import React from 'react';
import { useRecoilValue } from 'recoil';
import { GameDataAtom } from './atoms/GameData';
import { GameData, Player } from './GameData';

const calcPlayerScore = (gameData: GameData, player: Player): number => {
    return gameData.blocks.filter(b => b.playerId == player.id && !b.selected).map(b => b.shape).flat().length;
}

const Scoreboard: React.FC = () => {
    const gameData = useRecoilValue(GameDataAtom);

    const sorted = [...gameData?.players ?? []].sort((p1, p2) => {
        const p1Score = calcPlayerScore(gameData, p1)
        const p2Score = calcPlayerScore(gameData, p2);

        return p2Score - p1Score;
    });

    return (
        <div className='scoreboard'>
            {
                sorted?.map(p => {
                    const score = calcPlayerScore(gameData, p);
                    return (
                        <div className='score' style={{color: `hsl(${p.hue}, 100%, 50%`}}>{p.id}: {score}</div>
                    )
                })
            }
        </div>
    );
};

export default Scoreboard;