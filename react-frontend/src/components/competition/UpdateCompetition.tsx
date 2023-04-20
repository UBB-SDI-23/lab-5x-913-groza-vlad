import { Autocomplete, Button, Card, CardActions, CardContent, Container, FormLabel, IconButton, TextField, colors } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../utils";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { CompetitionMenu } from "./CompetitionMenu";
import { Competition } from "../../models/Competition";


export const UpdateCompetition = () => {
    const { competitionId } = useParams<{ competitionId: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [competition, setCompetition] = useState<Competition>({
        id: parseInt(String(competitionId)),
        name: "",
        number_of_participants: 0,
        total_prizes: 0,
        ko_stages: false,
        edition: 0,
    });

    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_URL}/competitions/${competitionId}/`).then(response => response.json()).then(data => {
          setCompetition(data);
          setLoading(false);
        });
      }, [competitionId]);

    const updateCompetition = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setLoading(true);
        fetch(`${BACKEND_URL}/competitions/${competitionId}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(competition)
        }).then(response => {
            if (response.ok) {
                alert("Competition updated successfully");
            } else {
                console.error('Error updating club:', response.statusText);
                alert("Error updating club: " + response.statusText);
            }
            navigate(`/competitions/`);
            setLoading(false);
        }).catch(error => {
            console.error('Error updating club:', error);
            setLoading(false);
        });
    }

    const handleCancel = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		navigate("/competitions");
	};

    return (
        <Container>
            <CompetitionMenu />
            <Card>
				<CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/competitions`}>
						<ArrowBackIcon />
					</IconButton>{" "}
                    <form onSubmit={updateCompetition} style={{display: "flex", flexDirection: "column", padding: "8px"}}>
                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Competition name
                            </FormLabel>
                            <TextField
                                id="name"
                                variant="outlined"
                                value={competition.name}
                                onChange={(event) => setCompetition({ ...competition, name: event.target.value })}
                            />
                        </Container>
    
                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Number of participants
                            </FormLabel>
                            <TextField
                                id="participants"
                                variant="outlined"
                                value={competition.number_of_participants}
                                onChange={(event) => setCompetition({ ...competition, number_of_participants: parseInt(event.target.value) })}
                            />
                        </Container>

                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Total prizes
                            </FormLabel>
                            <TextField
                                id="total_prizes"
                                variant="outlined"
                                value={competition.total_prizes}
                                onChange={(event) => setCompetition({ ...competition, total_prizes: parseInt(event.target.value) })}
                            />
                        </Container>

                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                KO stages
                            </FormLabel>
                            <Autocomplete style={{width: "100px"}}
                                id="ko_stages"
                                options={[true, false]}
                                value={competition.ko_stages}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                onChange={(event, newValue) => setCompetition({ ...competition, ko_stages: Boolean(newValue) })}
                            />
                        </Container>
                        
                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Edition
                            </FormLabel>
                            <TextField
                                id="edition"
                                variant="outlined"
                                value={competition.edition}
                                onChange={(event) => setCompetition({ ...competition, edition: parseInt(event.target.value) })}
                            />
                        </Container>
                        
                    </form>
				</CardContent>
				<CardActions sx={{ justifyContent: "center" }}>
					<Button type="submit" onClick={updateCompetition} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Update</Button>
					<Button onClick={handleCancel} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Cancel</Button>
				</CardActions>
			</Card>
        </Container>
    );
}