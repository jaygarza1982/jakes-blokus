import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { GameDataAtom } from './atoms/GameData';

const GameQuery: React.FC<{ gameId: string }> = ({ gameId }) => {
  const setGameState = useSetRecoilState(GameDataAtom);

  const { isLoading } = useQuery(
    {
        queryKey: ['gameData'],
        queryFn: async () => {
            console.log('Fetching game data', gameId);
            
          const response = await axios.get(`/api/game/${gameId}`);
          setGameState(response.data);
          return response.data;
        },
        refetchInterval: 1000
    }
  );

  if (isLoading) return <></>
  return <></>
};

export default GameQuery;
