import React from 'react';
import { useRecoilState } from 'recoil';
import { GameDataAtom } from './atoms/GameData';
import selectPlayerBlock from './util/CreateBlock';
import { GameData, Player } from './GameData';

interface BlockSelectButtonProps {
    blockNumber: number;
    blockShape: number[][];
    player: Player;
}

const BlockSelectButton: React.FC<BlockSelectButtonProps> = (props: BlockSelectButtonProps) => {
  const [gameData, setGameData] = useRecoilState<GameData>(GameDataAtom);

  const addPlayerBlock = (player: Player, shape: number[][]) => {
    const x = 500;
    const y = 500;

    return () => {
      setGameData(g => {
        return selectPlayerBlock(g, player, shape, x, y, props.blockNumber);
      })
    }
  }

  // Do not render if we already placed this block number
  if (gameData.blocks.find(b => b.playerId == props.player.id && b.blockNumber == props.blockNumber)) {
    return <></>
  }

  return (
    <img className='block-img' src={`/${props.blockNumber}.png`} onClick={addPlayerBlock(props.player, props.blockShape)} />
  );
};

export default BlockSelectButton;