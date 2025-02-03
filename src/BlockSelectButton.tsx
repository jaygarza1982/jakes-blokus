import React from 'react';
import { useSetRecoilState } from 'recoil';
import { GameDataAtom } from './atoms/GameData';
import createPlayerBlock from './util/CreateBlock';
import { GameData } from './GameData';

interface BlockSelectButtonProps {
    blockNumber: number;
    blockShape: number[][];
    playerId: string;
}

const BlockSelectButton: React.FC<BlockSelectButtonProps> = (props: BlockSelectButtonProps) => {
  const setGameData = useSetRecoilState<GameData>(GameDataAtom);

  const addPlayerBlock = (playerId: string, shape: number[][]) => {
    const x = 0;
    const y = 0;

    return () => {
      setGameData(g => {
        return createPlayerBlock(g, playerId, shape, x, y);
      })
    }
  }

  return (
    <img className='block-img' src={`/${props.blockNumber}.png`} onClick={addPlayerBlock(props.playerId, props.blockShape)} />
  );
};

export default BlockSelectButton;