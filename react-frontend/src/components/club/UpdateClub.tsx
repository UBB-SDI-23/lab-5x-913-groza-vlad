import { Button, Card, CardActions, CardContent, Container, FormLabel, IconButton, TextField, colors } from "@mui/material";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../utils";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FootballClub } from "../../models/FootballClub";
import { useState } from "react";


export const UpdateClub = () => {
    const { clubId } = useParams();
    const navigate = useNavigate();

    const [club, setClub] = useState<FootballClub>(
        
    );

    const updateClub = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
			await axios.put(`${BACKEND_URL}/clubs/${clubId}/`);
		    navigate("/clubs");
		} catch (error) {
			console.log(error);
		}
    }

    const handleCancel = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		navigate("/clubs");
	};

    return (
        <Container>
            <Card>
				<CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/clubs`}>
						<ArrowBackIcon />
					</IconButton>{" "}
                    <form onSubmit={updateClub} style={{display: "flex", flexDirection: "column", padding: "8px"}}>
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
                    </form>
				</CardContent>
				<CardActions sx={{ justifyContent: "center" }}>
					<Button type="submit" onClick={updateClub} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Update</Button>
					<Button onClick={handleCancel} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Cancel</Button>
				</CardActions>
			</Card>
        </Container>
    );
}