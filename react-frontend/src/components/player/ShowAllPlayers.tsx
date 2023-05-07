import { SetStateAction, useEffect, useState } from "react";
import ReadMoreIcon from "@mui/icons-material/ReadMore"
import EditIcon from "@mui/icons-material/Edit"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { Container, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip, colors, Pagination, Box } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../utils";
import { PlayerMenu } from "./PlayerMenu";
import { FootballPlayer } from "../../models/FootballPlayer";

export const ShowAllPlayers = () => {
    const [loading, setLoading] = useState(false);
    const [players, setPlayers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handlePageChange = (event: { preventDefault: () => void }, value: SetStateAction<number>) => {
        event.preventDefault();
        setPage(value);
    };

    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_URL}/players/?page=${page}&page_size=100`)
        .then(response => response.json())
        .then(data => { setPlayers(data.results); setTotalPages(Math.ceil(data.count / 100)); setLoading(false); });
    } , [page]);


    return (
        <Container>
            <PlayerMenu />
         <h1>Players list</h1>
         {!loading && players.length === 0 && <div>No football players in the list</div>}
         {!loading &&
            players.length > 0 && (
                <><TableContainer style={{ backgroundColor: colors.grey[50] }}>
                    <Table sx={{ minWidth: 850 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">#</TableCell>
                                <TableCell align="center">First Name</TableCell>
                                <TableCell align="center">Last Name</TableCell>
                                <TableCell align="center">Nationality</TableCell>
                                <TableCell align="center">Age</TableCell>
                                <TableCell align="center">Position</TableCell>
                                <TableCell align="center">Operations</TableCell>
                                <TableCell align="center">User</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {players.map((player: any, index) => (
                                <TableRow key={player.id}>
                                    <TableCell align="center" component="th" scope="row">{(page - 1) * 100 + index + 1}</TableCell>
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
                                                <ReadMoreIcon />
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton
                                            component={Link}
                                            sx={{ mr: 3 }}
                                            to={`/players/${player.id}/edit`}>
                                            <Tooltip title="Update player data" arrow>
                                                <EditIcon />
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
                                    <TableCell align="center">
                                        <IconButton
                                            component={Link}
                                            sx={{ fontSize: 13 , color: '#000'}}
                                            to={`/user-profile/${player?.user?.id}`}>
                                            {player?.user?.username}
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ mt: 2, align: "center"}}>
                    <Pagination sx={{ '& .MuiPaginationItem-textPrimary': { color: '#fff' } }}
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        size="large"
                        showFirstButton
                        showLastButton
                        boundaryCount={2}
                        siblingCount={2}
                    />
                </Box>
                </>   
            )
            } 
        </Container>
    )
}