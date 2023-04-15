import { Button, Card, CardActions, CardContent, Container, FormLabel, IconButton, TextField, colors } from "@mui/material";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../utils";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FootballClub } from "../../models/FootballClub";
import { useEffect, useState } from "react";


export const UpdateClub = () => {
    const { clubId } = useParams<{ clubId: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [club, setClub] = useState<FootballClub>({
        id: parseInt(String(clubId)),
        name: "",
        establishment_year: 0,
        country: "",
        city: "",
        budget: 0,
        home_kit: "",
        players: [],
        competitions: [],
    });

    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_URL}/clubs/${clubId}/`).then(response => response.json()).then(data => {
          setClub(data);
          setLoading(false);
        });
      }, [clubId]);

    const updateClub = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setLoading(true);
        fetch(`${BACKEND_URL}/clubs/${clubId}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(club)
        }).then(response => {
            if (response.ok) {
                alert("Club updated successfully");
            } else {
                console.error('Error updating club:', response.statusText);
            }
            navigate(`/clubs/`);
            setLoading(false);
        }).catch(error => {
            console.error('Error updating club:', error);
            setLoading(false);
        });
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
                            <TextField
                                id="name"
                                variant="outlined"
                                value={club.name}
                                onChange={(event) => setClub({ ...club, name: event.target.value })}
                            />
                        </Container>
    
                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Establishment year
                            </FormLabel>
                            <TextField
                                id="establishment_year"
                                variant="outlined"
                                value={club.establishment_year}
                                onChange={(event) => setClub({ ...club, establishment_year: parseInt(event.target.value) })}
                            />
                        </Container>

                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Country
                            </FormLabel>
                            <TextField
                                id="country"
                                variant="outlined"
                                value={club.country}
                                onChange={(event) => setClub({ ...club, country: event.target.value })}
                            />
                        </Container>

                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                City
                            </FormLabel>
                            <TextField
                                id="city"
                                variant="outlined"
                                value={club.city}
                                onChange={(event) => setClub({ ...club, city: event.target.value })}
                            />
                        </Container>
                        
                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Budget
                            </FormLabel>
                            <TextField
                                id="budget"
                                variant="outlined"
                                value={club.budget}
                                onChange={(event) => setClub({ ...club, budget: parseInt(event.target.value) })}
                            />
                        </Container>
                        
                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Home kit
                            </FormLabel> 
                            <TextField
                                id="home_kit"
                                variant="outlined"
                                value={club.home_kit}
                                onChange={(event) => setClub({ ...club, home_kit: event.target.value })}
                            />
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