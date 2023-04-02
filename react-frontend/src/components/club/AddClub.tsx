import { Link, useNavigate } from "react-router-dom";
import { FootballClub } from "../../models/FootballClub";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utils";
import { Button, Card, CardActions, CardContent, Container, IconButton, TextField, FormLabel, colors } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


export const AddClub = () => {
    const navigate = useNavigate();
    const [club, setClub] = useState<FootballClub>();

    const addClub = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
		try {
			await axios.post(`${BACKEND_URL}/clubs/`, club);
			navigate("/clubs");
		} catch (error) {
			console.log(error);
		}
    }

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/clubs`}>
						<ArrowBackIcon />
					</IconButton>{" "}
                    <form onSubmit={addClub} style={{display: "flex", flexDirection: "column", padding: "8px"}}>
                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Club name
                            </FormLabel>
                            <TextField>
                                id="name"
                                label="Club name"
                                variant="outlined"
                                onChange={(event) => setClub({ ...club, name: event.target.value })}
                            </TextField>
                        </Container>
    
                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Establishment year
                            </FormLabel>
                            <TextField>
                                id="establishment_year"
                                label="Establishment year"
                                variant="outlined"
                                onChange={(event) => setClub({ ...club, establishment_year: event.target.value })}
                            </TextField>
                        </Container>

                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Country
                            </FormLabel>
                            <TextField>
                                id="country"
                                label="Country"
                                variant="outlined"
                                onChange={(event) => setClub({ ...club, country: event.target.value })}
                            </TextField>
                        </Container>

                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                City
                            </FormLabel>
                            <TextField>
                                id="city"
                                label="City"
                                variant="outlined"
                                onChange={(event) => setClub({ ...club, city: event.target.value })}
                            </TextField>
                        </Container>
                        
                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Budget
                            </FormLabel>
                            <TextField>
                                id="budget"
                                label="Budget"
                                variant="outlined"
                                onChange={(event) => setClub({ ...club, budget: event.target.value })}
                            </TextField>
                        </Container>
                        
                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Home kit
                            </FormLabel> 
                            <TextField>
                                id="home_kit"
                                label="Home kit"
                                variant="outlined"
                                onChange={(event) => setClub({ ...club, home_kit: event.target.value })}
                            </TextField>
                        </Container>

                        <Button type="submit" variant="contained" sx={{ backgroundColor: colors.green[500] }} onClick={addClub}>Add club</Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}