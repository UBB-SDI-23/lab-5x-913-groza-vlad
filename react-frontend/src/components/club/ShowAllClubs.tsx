import { useEffect, useState } from "react";
import { FootballClub } from "../../models/FootballClub";
import AddIcon from "@mui/icons-material/Add"
import ReadMoreIcon from "@mui/icons-material/ReadMore"
import EditIcon from "@mui/icons-material/Edit"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { Container, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip, colors } from "@mui/material";
import { Link } from "react-router-dom";


export const ShowAllClubs = () => {
    const [loading, setLoading] = useState(false);
    const [clubs, setClubs] = useState([])

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:8000/clubs/").then(response => response.json()).then(data => { setClubs(data); setLoading(false); });
    } , []);

    return (
      <Container>
         <h1>FootballClubs list</h1>
         {!loading && clubs.length === 0 && <div>No football clubs int the list</div>}
         {!loading &&
            clubs.length > 0 && (
                // set the table background color to white and the text color to black
                <TableContainer style={{backgroundColor: colors.grey[50]}}>
                    <Table sx={{ minWidth: 850}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">#</TableCell>
                                <TableCell align="center">Club name</TableCell>
                                <TableCell align="center">Establishment year</TableCell>
                                <TableCell align="center">Country</TableCell>
                                <TableCell align="center">City</TableCell>
                                <TableCell align="center">Budget</TableCell>
                                <TableCell align="center">Home Kit</TableCell>
                                <TableCell>Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        
                        <TableBody>
                        {clubs.map((club: FootballClub, index) => (
                            <TableRow key={club.id}>
                                <TableCell align="center" component="th" scope="row">{index + 1}</TableCell>
                                <TableCell align="center" component="th" scope="row">
                                        {club.name}
                                </TableCell>
                                <TableCell align="center">{club.establishment_year}</TableCell>
                                <TableCell align="center">{club.country}</TableCell>
                                <TableCell align="center">{club.city}</TableCell>
                                <TableCell align="center">{club.budget}</TableCell>
                                <TableCell align="center">{club.home_kit}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        component={Link}
                                        sx={{ mr: 3 }}
                                        to={`/clubs/${club.id}/players`}>
                                        <Tooltip title="View club players" arrow>
                                            <ReadMoreIcon/>
                                        </Tooltip>
                                    </IconButton>

                                    <IconButton
                                        component={Link}
                                        sx={{ mr: 3 }}
                                        to={`/clubs/${club.id}/competitions`}>
                                        <Tooltip title="View competitions in which club participate" arrow>
                                            <ReadMoreIcon/>
                                        </Tooltip>
                                    </IconButton>

                                    <IconButton component={Link} sx={{ mr: 3 }} to={`/clubs/${club.id}/edit`}>
                                        <EditIcon/>
                                    </IconButton>

                                    <IconButton component={Link} sx={{ mr: 3 }} to={`/clubs/${club.id}/delete`}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </TableCell>
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