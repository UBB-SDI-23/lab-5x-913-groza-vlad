import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { BACKEND_URL } from "../../utils";
import { Button, Card, CardContent, Container, IconButton, TextField, FormLabel, colors, Autocomplete } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useForm } from "react-hook-form";
import { CompetitionMenu } from "./CompetitionMenu";
import { Competition } from "../../models/Competition";


export const AddCompetition = () => {
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
        description: "",
    });


    const addCompetition = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setLoading(true);
        fetch(`${BACKEND_URL}/competitions/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(competition)
        }).then(response => {
            if (response.ok) {
                alert("Competition added successfully");
            } else {
                console.error('Error adding competition:', response.statusText);
                alert("Error adding competition: " + response.statusText);
            }
            navigate(`/competitions/`);
            setLoading(false);
        }).catch(error => {
            console.error('Error adding competition:', error);
            setLoading(false);
        });
    }

    return (
        <Container>
            <CompetitionMenu />
            <Card>
				<CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/competitions`}>
						<ArrowBackIcon />
					</IconButton>{" "}
                    <form onSubmit={addCompetition} style={{display: "flex", flexDirection: "column", padding: "8px"}}>
                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Competition name
                            </FormLabel>
                            <TextField
                                id="name"
                                variant="outlined"
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
                                onChange={(event) => setCompetition({ ...competition, total_prizes: parseInt(event.target.value) })}
                            />
                        </Container>

                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                KO stages
                            </FormLabel>
                            <Autocomplete style={{width: "150px"}}
                                id="ko_stages"
                                options={[true, false]}
                                renderInput={(params) => <TextField {...params} />}
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
                                onChange={(event) => setCompetition({ ...competition, edition: parseInt(event.target.value) })}
                            />
                        </Container>

                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Description
                            </FormLabel>
                            <TextField
                                id="description"
                                variant="outlined"
                                onChange={(event) => setCompetition({ ...competition, description: event.target.value })}
                            />
                        </Container>
                        
                        <Button type="submit" variant="contained" sx={{ backgroundColor: colors.green[500] }}>Add competition</Button>
                    </form>
				</CardContent>
			</Card>
        </Container>
    );
}