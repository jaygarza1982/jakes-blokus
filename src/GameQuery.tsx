import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { GameDataAtom } from './atoms/GameData';

const GameQuery: React.FC<{ gameId: string }> = ({ gameId }) => {
  const setGameState = useSetRecoilState(GameDataAtom);

  const { data, error, isLoading } = useQuery(
    {
        queryKey: ['gameData'],
        queryFn: async () => {
            console.log('Fetching game data', gameId);
            
          const response = await axios.get(`/api/game/${gameId}`);
          setGameState(response.data);
          return response.data;
        },
        refetchInterval: 5000
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (data) {
    return (
      <div>
        <h2>{data.name}</h2>
        {/* ... other game details */}
      </div>
    );
  }

  return null;
};

export default GameQuery;
