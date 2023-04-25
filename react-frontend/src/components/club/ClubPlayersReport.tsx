import { SetStateAction, useEffect, useState } from "react";
import { Container, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, colors, Box, Pagination } from "@mui/material";
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
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handlePageChange = (event: { preventDefault: () => void }, value: SetStateAction<number>) => {
        event.preventDefault();
        setPage(value);
    };

    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_URL}/clubs/avg_age/?page=${page}&page_size=100`)
        .then(response => response.json())
        .then(data => { setClubs(data.results); setTotalPages(Math.ceil(data.count / 100)); setLoading(false); });
    } , [page]);

    return (
      <Container>
        <ClubMenu/>
         <h2 style={{textAlign: "left", marginLeft: "12px"}}>FootballClubs and the average age of their players</h2>
         {!loading && clubs.length === 0 && <div>No football clubs in the list</div>}
         {!loading &&
            clubs.length > 0 && (
                <><TableContainer style={{backgroundColor: colors.grey[50]}}>
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
                                <TableCell align="center" component="th" scope="row">{(page - 1) * 100 + index + 1}</TableCell>
                                <TableCell align="center" component="th" scope="row">{club.name}</TableCell>
                                <TableCell align="center">{club.establishment_year}</TableCell>
                                <TableCell align="center">{club.country}</TableCell>
                                <TableCell align="center">{club.average_age}</TableCell>
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
                        showFirstButton
                        showLastButton
                        boundaryCount={2}
                        siblingCount={2}
                        sx={{ '& .MuiPaginationItem-textPrimary': { color: '#fff' } }}
                    />
                </Box>
                </>
            )
            } 
      </Container>
    )
  }