import { SetStateAction, useState } from 'react';
import { TextField, Button, Container, TableContainer, Table, colors, TableHead, TableCell, TableRow, TableBody, Tooltip, IconButton } from '@mui/material';
import { FootballPlayer } from '../../models/FootballPlayer';
import { BACKEND_URL } from "../../utils";
import { PlayerMenu } from './PlayerMenu';
import ReadMoreIcon from "@mui/icons-material/ReadMore"
import EditIcon from "@mui/icons-material/Edit"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { Link } from "react-router-dom";

export const PlayerFilterByAge = () => {
    const [age, setAge] = useState('');
    const [loading, setLoading] = useState(false);
    const [players, setPlayers] = useState([]);

    const handleAgeChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setAge(event.target.value);
    };

    const handleFilterClick = () => {
        fetch(`${BACKEND_URL}/players/filter-age?age=${age}`)
        .then(response => response.json())
        .then(data => setPlayers(data));
    };

    return (
        <Container>
            <PlayerMenu />
            {!loading && players.length === 0 && <div>No football players older than this age</div>}
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
            <Container sx={{padding: "4px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
                <TextField label="Age" onChange={handleAgeChange} InputProps={{style: {color: "white"}}}/>
                <Button variant="contained" onClick={handleFilterClick} style={{color: colors.grey[300]}}>Filter</Button>
            </Container>
        </Container>
    );
}