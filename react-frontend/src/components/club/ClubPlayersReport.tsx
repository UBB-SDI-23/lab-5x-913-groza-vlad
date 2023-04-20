import { useEffect, useState } from "react";
import { Container, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, colors } from "@mui/material";
import { BACKEND_URL } from "../../utils";
import { ClubMenu } from "./ClubMenu";


interface FootballClubPlayers {
    id: number;
    name: string,
    establishment_year: number,
    country: string,
    average_age: number;
}


export const ClubsPlayersAge = () => {
    const [loading, setLoading] = useState(false);
    const [clubs, setClubs] = useState([])

    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_URL}/clubs/avg_age/`).then(response => response.json()).then(data => { setClubs(data); setLoading(false); });
    } , []);

    return (
      <Container>
        <ClubMenu/>
         <h2 style={{textAlign: "left", marginLeft: "12px"}}>FootballClubs and the average age of their players</h2>
         {!loading && clubs.length === 0 && <div>No football clubs in the list</div>}
         {!loading &&
            clubs.length > 0 && (
                <TableContainer style={{backgroundColor: colors.grey[50]}}>
                    <Table sx={{ minWidth: 400}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">#</TableCell>
                                <TableCell align="center">Club name</TableCell>
                                <TableCell align="center">Establishment Year</TableCell>
                                <TableCell align="center">Country</TableCell>
                                <TableCell align="center">Average Age</TableCell>
                            </TableRow>
                        </TableHead>
                        
                        <TableBody>
                        {clubs.map((club: FootballClubPlayers, index) => (
                            <TableRow key={club.id}>
                                <TableCell align="center" component="th" scope="row">{index + 1}</TableCell>
                                <TableCell align="center" component="th" scope="row">{club.name}</TableCell>
                                <TableCell align="center">{club.establishment_year}</TableCell>
                                <TableCell align="center">{club.country}</TableCell>
                                <TableCell align="center">{club.average_age}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
            } 
      </Container>
    )
  }