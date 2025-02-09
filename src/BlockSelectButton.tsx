import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { GameDataAtom } from './atoms/GameData';
import createPlayerBlock from './util/CreateBlock';
import { GameData, Player } from './GameData';
import { SelectedBlockAtom } from './atoms/SelectedBlock';

interface BlockSelectButtonProps {
    blockNumber: number;
    blockShape: number[][];
    player: Player;
}

const BlockSelectButton: React.FC<BlockSelectButtonProps> = (props: BlockSelectButtonProps) => {
  const gameData = useRecoilValue<GameData>(GameDataAtom);
  const setSelectedBlock = useSetRecoilState(SelectedBlockAtom);

  const addPlayerBlock = (player: Player, shape: number[][]) => {
    return () => {
      setSelectedBlock((s) => {
        return createPlayerBlock(player, shape, s.x, s.y, props.blockNumber);
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