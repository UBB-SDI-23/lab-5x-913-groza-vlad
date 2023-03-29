import { useEffect, useState } from "react";
import { FootballClub } from "../../models/FootballClub";

export const ShowAllClubs = () => {
    const [clubs, setClubs] = useState([])

    useEffect(() => {
        fetch("http://localhost:8000/clubs/").then(response => response.json()).then(data => setClubs(data));
    } , []);

    return (
      <div className="App">
        <h1>FootballClubs list</h1>
        {clubs.length === 0 && <div>No football clubs int the list</div>}
        {
            clubs.length > 0 && 
        <table className="clubTable">
            <tr>
                <th>#</th>
                <th>Club name</th>
                <th>Establishment year</th>
                <th>Country</th>
                <th>City</th>
                <th>Budger</th>
                <th>Home Kit</th>
            </tr>
            {clubs.map((club: FootballClub, index) => (
                <tr key={index}>
                    <td>{index}</td>
                    <td>{club.name}</td>
                    <td>{club.establishment_year}</td>
                    <td>{club.country}</td>
                    <td>{club.city}</td>
                    <td>{club.budget}</td>
                    <td>{club.home_kit}</td>
                </tr>
            ))}
        </table>
        }    
      </div>
    )
  }
