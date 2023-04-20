import { useEffect, useState } from "react";
import ReadMoreIcon from "@mui/icons-material/ReadMore"
import EditIcon from "@mui/icons-material/Edit"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { Container, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip, colors } from "@mui/material";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../utils";
import { PlayerMenu } from "./PlayerMenu";
import { FootballPlayer } from "../../models/FootballPlayer";

export const ShowAllPlayers = () => {
    const [loading, setLoading] = useState(false);
    const [players, setPlayers] = useState([])

    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_URL}/players/`).then(response => response.json()).then(data => { setPlayers(data); setLoading(false); });
    } , []);

    return (
        <Container>
            <PlayerMenu />
         <h1>Players list</h1>
         {!loading && players.length === 0 && <div>No football players in the list</div>}
         {!loading &&
            players.length > 0 && (
                <TableContainer style={{backgroundColor: colors.grey[50]}}>
                    <Table sx={{ minWidth: 850}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">#</TableCell>
                                <TableCell align="center">First Name</TableCell>
                                <TableCell align="center">Last Name</TableCell>
                                <TableCell align="center">Nationality</TableCell>
                                <TableCell align="center">Age</TableCell>
                                <TableCell align="center">Position</TableCell>
                                <TableCell>Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        
                        <TableBody>
                        {players.map((player: FootballPlayer, index) => (
                            <TableRow key={player.id}>
                                <TableCell align="center" component="th" scope="row">{index + 1}</TableCell>
                                <TableCell align="center">{player.first_name}</TableCell>
                                <TableCell align="center">{player.last_name}</TableCell>
                                <TableCell align="center">{player.nationality}</TableCell>
                                <TableCell align="center">{player.age}</TableCell>
                                <TableCell align="center">{player.position}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        component={Link}
                                        sx={{ mr: 3 }}
                                        to={`/players/${player.id}/club`}>
                                        <Tooltip title="View player's club" arrow>
                                            <ReadMoreIcon/>
                                        </Tooltip>
                                    </IconButton>

                                    <IconButton 
                                        component={Link} 
                                        sx={{ mr: 3 }} 
                                        to={`/players/${player.id}/edit`}>
                                        <Tooltip title="Update player data" arrow>
                                            <EditIcon/>
                                        </Tooltip>    
                                    </IconButton>

                                    <IconButton 
                                        component={Link} 
                                        sx={{ mr: 3 }} 
                                        to={`/players/${player.id}/delete`}>
                                        <Tooltip title="Delete player" arrow>
                                            <DeleteForeverIcon />
                                        </Tooltip>
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