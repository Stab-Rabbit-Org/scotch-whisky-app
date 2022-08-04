import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TastingList = () => {

function handleChange(id){
  const handleClick = async (id) => {
    console.log('this is the id',id)
    console.log('button');
    try {
      const response = await fetch('/whiskeys/delete', {
        method: 'DELETE',
        body: JSON.stringify({
          id
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
  
      const result = await response.json();
  
      console.log('result is: ', JSON.stringify(result));
    } catch (err) {
      console.log('error in Delete button');
     }
  }
  handleClick(id)
  window.location.reload()
}



const [whiskies, setWhiskies] = useState([]);

useEffect(() => {
    async function fetchWhiskies() {
        const response = await fetch ('/whiskeys')
        const data = await response.json();
        console.log(data);
        // const whiskeyArray = data.whiskeys;
        setWhiskies(data);
    }
    fetchWhiskies();
}, [])

console.log('after fetch call', whiskies);

const whiskyDiv = [];
  for (let i = 0; i < whiskies.length; i += 1) {
    const whisky = whiskies[i];
    whiskyDiv.push(
      <div key={i}>
        <hr/>
        <h3>{whisky.title}</h3>
        <h4><strong>Region</strong>: {whisky.region}</h4>
        <img src={whisky.img_url}/><br></br>
        <button onClick={()=>handleChange(whisky.id)} > Delete Whiskey </button>
      </div>
    );
  }

    return( 
<>
    <h2>Your Personal TastingList</h2>
    <Link to="/dashboard">Whiskies</Link>
    <div>{whiskyDiv}</div>
    <br></br>
</>    
    )
}

export default TastingList;