import React from 'react';
import { useState } from 'react';

  function HomeComponent() {
    const [choreDesc, setChoreDesc] = useState("");
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const handleSubmit= (e: React.FormEvent<HTMLFormElement>): void => {
    //   addChoreLog([choreDesc, name, date])
    console.log(choreDesc, " :: ", name, " :: ", date); 
    e.preventDefault();
    }
  
    return (
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => { handleSubmit(e) }}>
        <label>Chore description:</label>
        <br />
        <input 
          name='choreDesc' 
          type='text'
          value={choreDesc}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => { setChoreDesc(e.currentTarget.value); }}
        />
        <br/>
        <label>Name:</label>
        <br />
        <input 
          name='name' 
          type='text' 
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <br />
        <label>Date:</label>
        <br />
        <input
          name='date' 
          type='date'
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <br/>
        <input 
          type='submit' 
          value='Add Log' 
        />
      </form>
    )
  }

  export default HomeComponent;