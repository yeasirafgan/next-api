import PlayerItem from '@/components/player-item';
import { useEffect, useState } from 'react'

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(()=>{
    const getPlayers = async () => {
      try {

        setError('');
        setIsLoading(true);
        const res = await fetch('../api/players');
        if(!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setPlayers(data);
        setIsLoading(false);

      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }

    getPlayers()
  },[]);

  if(isLoading){
    return <div>
      <p>Loading.....</p>
    </div>
  }

  if(error){
    return <div>
      <p>{error}</p>
    </div>
  }
  return (
    <div>
      <h2>Players List</h2>
      {
        players.map((player)=>(
          <PlayerItem key={player.id} player={player}/>
        ))
      }
    </div>
  )
}

export default Players