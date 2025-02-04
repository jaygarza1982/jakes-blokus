import React from 'react';
import { useRecoilState } from 'recoil';
import { GameDataAtom } from './atoms/GameData';
import createPlayerBlock from './util/CreateBlock';
import { GameData } from './GameData';

interface BlockSelectButtonProps {
    blockNumber: number;
    blockShape: number[][];
    playerId: string;
}

const BlockSelectButton: React.FC<BlockSelectButtonProps> = (props: BlockSelectButtonProps) => {
  const [gameData, setGameData] = useRecoilState<GameData>(GameDataAtom);

  const addPlayerBlock = (playerId: string, shape: number[][]) => {
    const x = 0;
    const y = 0;

    return () => {
      setGameData(g => {
        return createPlayerBlock(g, playerId, shape, x, y, props.blockNumber);
      })
    }
  }

  // Do not render if we already placed this block number
  if (gameData.blocks.find(b => b.playerId == props.playerId && b.blockNumber == props.blockNumber)) {
    return <></>
  }

  return (
    <img className='block-img' src={`/${props.blockNumber}.png`} onClick={addPlayerBlock(props.playerId, props.blockShape)} />
  );
};

export default BlockSelectButton;