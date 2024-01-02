import PlayerItem from '@/components/player-item';
import { useEffect, useState } from 'react'

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [countryName, setCountryName] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // creating a new player object
    const playerObj = {
      id: Date.now(),
      name: playerName,
      country: countryName
    }
    // sending post request
    const res = await fetch('/api/players', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(playerObj)
  })
  const data = await res.json();
  // check if res.ok is not true / false
  if(!res.ok){
    console.log('Failed to send data 📀');
    
  }
  // check if res.ok is true
  if(res.ok){
    console.log('Success', data );
    setPlayers([...players, data])
  }
  }

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
      <h2>Add a new Player</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="playername">What is Player Name : </label>
        <input type='text' placeholder='Enter a player name! ⛹🏽‍♂️' name='playername' value={playerName} onChange={(e)=> setPlayerName(e.target.value)}/><br />
        <label htmlFor="playercountry">What is Player Country : </label>
        <input type='text' placeholder='Enter a country name! 🌈' name='playercountry' value={countryName} onChange={(e)=> setCountryName(e.target.value)}/><br />
        <button type='submit'>Add Player</button>
      </form>
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