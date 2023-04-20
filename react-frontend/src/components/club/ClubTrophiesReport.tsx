import { useEffect, useState } from "react";
import { Container, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, colors } from "@mui/material";
import { BACKEND_URL } from "../../utils";
import { ClubMenu } from "./ClubMenu";


interface FootballClubTrophies {
    id: number;
    name: string;
    total_trophies: number;
}


export const ClubsTrophies = () => {
    const [loading, setLoading] = useState(false);
    const [clubs, setClubs] = useState([])

    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_URL}/clubs/most-trophies/`).then(response => response.json()).then(data => { setClubs(data); setLoading(false); });
    } , []);

    return (
      <Container>
        <ClubMenu />
         <h2 style={{textAlign: "left", marginLeft: "12px"}}>FootballClubs and the number of trophies won</h2>
         {!loading && clubs.length === 0 && <div>No football clubs in the list</div>}
         {!loading &&
            clubs.length > 0 && (
                // set the table background color to white and the text color to black
                <TableContainer style={{backgroundColor: colors.grey[50]}}>
                    <Table sx={{ minWidth: 400}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">#</TableCell>
                                <TableCell align="center">Club name</TableCell>
                                <TableCell align="center">Trophies won</TableCell>
                            </TableRow>
                        </TableHead>
                        
                        <TableBody>
                        {clubs.map((club: FootballClubTrophies, index) => (
                            <TableRow key={club.id}>
                                <TableCell align="center" component="th" scope="row">{index + 1}</TableCell>
                                <TableCell align="center" component="th" scope="row">{club.name}</TableCell>
                                <TableCell align="center">{club.total_trophies}</TableCell>
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
