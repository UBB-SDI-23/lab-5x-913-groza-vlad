import { SetStateAction, useEffect, useState } from "react";
import ReadMoreIcon from "@mui/icons-material/ReadMore"
import EditIcon from "@mui/icons-material/Edit"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { Container, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip, colors, Box, Pagination } from "@mui/material";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../utils";
import { Record } from "../../models/Record";
import { RecordMenu } from "./RecordMenu";

export const ShowAllRecords = () => {
    const [loading, setLoading] = useState(false);
    const [records, setRecords] = useState([])
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handlePageChange = (event: { preventDefault: () => void }, value: SetStateAction<number>) => {
        event.preventDefault();
        setPage(value);
    };

    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_URL}/records/?page=${page}&page_size=200`)
        .then(response => response.json())
        .then(data => { setRecords(data.results); setTotalPages(Math.ceil(data.count / 200)); setLoading(false); });
    } , [page]);
    

    return (
        <Container>
            <RecordMenu />
         <h1>Records list</h1>
         {!loading && records.length === 0 && <div>No records in the list</div>}
         {!loading &&
            records.length > 0 && (
                <><TableContainer style={{backgroundColor: colors.grey[50]}}>
                    <Table sx={{ minWidth: 850}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">#</TableCell>
                                <TableCell align="center">Football Club</TableCell>
                                <TableCell align="center">Competition</TableCell>
                                <TableCell align="center">Trophies Won</TableCell>
                                <TableCell align="center">Participations</TableCell>
                                <TableCell>Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        
                        <TableBody>
                        {records.map((record: Record, index) => (
                            <TableRow key={record.id}>
                                <TableCell align="center" component="th" scope="row">{(page - 1) * 200 + index + 1}</TableCell>
                                <TableCell align="center">{record.club?.name}</TableCell>
                                <TableCell align="center">{record.competition?.name}</TableCell>
                                <TableCell align="center">{record.trophies_won}</TableCell>
                                <TableCell align="center">{record.no_of_participations}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        component={Link}
                                        sx={{ mr: 3 }}
                                        to={`/records/${record.id}/details`}>
                                        <Tooltip title="View club and competition details" arrow>
                                            <ReadMoreIcon/>
                                        </Tooltip>
                                    </IconButton>

                                    <IconButton 
                                        component={Link} 
                                        sx={{ mr: 3 }} 
                                        to={`/records/${record.id}/edit`}>
                                        <Tooltip title="Update record data" arrow>
                                            <EditIcon/>
                                        </Tooltip>    
                                    </IconButton>

                                    <IconButton 
                                        component={Link} 
                                        sx={{ mr: 3 }} 
                                        to={`/records/${record.id}/delete`}>
                                        <Tooltip title="Delete record" arrow>
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
                    showFirstButton
                    showLastButton
                    boundaryCount={4}
                    />
                </Box>
                </>   
            )
            } 
        </Container>
    )
}