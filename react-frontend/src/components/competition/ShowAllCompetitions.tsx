import { SetStateAction, useEffect, useState } from "react";
import ReadMoreIcon from "@mui/icons-material/ReadMore"
import EditIcon from "@mui/icons-material/Edit"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { Container, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip, colors, Box, Pagination } from "@mui/material";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../utils";
import { CompetitionMenu } from "./CompetitionMenu";
import { Competition } from "../../models/Competition";

export const ShowAllCompetitions = () => {
    const [loading, setLoading] = useState(false);
    const [competitions, setCompetitions] = useState([])
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handlePageChange = (event: { preventDefault: () => void }, value: SetStateAction<number>) => {
        event.preventDefault();
        setPage(value);
    };

    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_URL}/competitions/?page=${page}&page_size=100`)
        .then(response => response.json()).
        then(data => { setCompetitions(data.results); setTotalPages(Math.ceil(data.count / 100)); setLoading(false); });
    } , [page]);

    return (
        <Container>
            <CompetitionMenu />
         <h1>Competitions list</h1>
         {!loading && competitions.length === 0 && <div>No competitions in the list</div>}
         {!loading &&
            competitions.length > 0 && (
                <><TableContainer style={{backgroundColor: colors.grey[50]}}>
                    <Table sx={{ minWidth: 850}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">#</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Participants Number</TableCell>
                                <TableCell align="center">Total Prizes</TableCell>
                                <TableCell align="center">KO Stages</TableCell>
                                <TableCell align="center">Edition</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell>Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        
                        <TableBody>
                        {competitions.map((competition: Competition, index) => (
                            <TableRow key={competition.id}>
                                <TableCell align="center" component="th" scope="row">{(page - 1) * 100 + index + 1}</TableCell>
                                <TableCell align="center">{competition.name}</TableCell>
                                <TableCell align="center">{competition.number_of_participants}</TableCell>
                                <TableCell align="center">{competition.total_prizes}</TableCell>
                                <TableCell align="center">{String(competition.ko_stages)}</TableCell>
                                <TableCell align="center">{competition.edition}</TableCell>
                                <TableCell align="center">{competition.description}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        component={Link}
                                        sx={{ mr: 3 }}
                                        to={`/competitions/${competition.id}/clubs`}>
                                        <Tooltip title="View clubs in competition" arrow>
                                            <ReadMoreIcon/>
                                        </Tooltip>
                                    </IconButton>

                                    <IconButton 
                                        component={Link} 
                                        sx={{ mr: 3 }} 
                                        to={`/competitions/${competition.id}/edit`}>
                                        <Tooltip title="Update competition data" arrow>
                                            <EditIcon/>
                                        </Tooltip>    
                                    </IconButton>

                                    <IconButton 
                                        component={Link} 
                                        sx={{ mr: 3 }} 
                                        to={`/competitions/${competition.id}/delete`}>
                                        <Tooltip title="Delete competition" arrow>
                                            <DeleteForeverIcon />
                                        </Tooltip>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ mt: 2, align: "center"}}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        size="large"
                        siblingCount={2}
                        sx={{ '& .MuiPaginationItem-textPrimary': { color: '#fff' } }}
                        showFirstButton
                        showLastButton
                        boundaryCount={2}
                    />
                </Box>
                </>   
            )
            } 
        </Container>
    )
}