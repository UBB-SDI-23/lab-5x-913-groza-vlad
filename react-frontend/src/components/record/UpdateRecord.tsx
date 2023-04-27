import { Autocomplete, Button, Card, CardActions, CardContent, Container, FormLabel, IconButton, TextField, colors } from "@mui/material";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../utils";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FootballClub } from "../../models/FootballClub";
import { useCallback, useEffect, useRef, useState } from "react";
import { Record } from "../../models/Record";
import { debounce } from "lodash";
import { RecordMenu } from "./RecordMenu";
import { Competition } from "../../models/Competition";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const UpdateRecord= () => {
    const { recordId } = useParams<{ recordId: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [clubs, setClubs] = useState<FootballClub[]>([]);
    const [competitions, setCompetitions] = useState<Competition[]>([]);

    const [record, setRecord] = useState<Record>({
        id: parseInt(String(recordId)),
        trophies_won: 0,
        no_of_participations: 0,
        club: 1, 
        competition: 1,
    });

    const club = useRef<FootballClub>({
        name: "",
        establishment_year: 0,
        country: "",
        city: "",
        budget: 0,
        home_kit: "",
    })

    const competition = useRef<Competition>({
        name: "",
        number_of_participants: 0,
        total_prizes: 0,
        ko_stages: false,
        edition: 0,
        description: "",
    })

    useEffect(() => {
        const fetchRecord = async () => {
            const response = await fetch(
                `${BACKEND_URL}/records/${recordId}/`);


            const record = await response.json();
            const fetchedClub = {
                id: record.club.id,
                name: record.club.name,
                establishment_year: record.club.establishment_year,
                country: record.club.country,
                city: record.club.city,
                budget: record.club.budget,
                home_kit: record.club.home_kit,
                competitions: record.club.competitions,
            };
            club.current = fetchedClub;
            setClubs([club.current]);

            const fetchedCompetition = {
                id: record.competition.id,
                name: record.competition.name,
                number_of_participants: record.competition.number_of_participants,
                total_prizes: record.competition.total_prizes,
                ko_stages: record.competition.ko_stages,
                edition: record.competition.edition,
                description: record.competition.description,
            }
            competition.current = fetchedCompetition;
            setCompetitions([competition.current]);

            setRecord({
                id: record.id,
                trophies_won: record.trophies_won,
                no_of_participations: record.no_of_participations,
                club: record.club_id,
                competition: record.competition_id,
                club_id: fetchedClub,
                competition_id: fetchedCompetition,
            });

            setLoading(false);
        };
        fetchRecord();
      }, [recordId]);

    const updateRecord = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setLoading(true);
        fetch(`${BACKEND_URL}/records/${recordId}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(record)
        }).then(response => {
            if (response.ok) {
                alert("Record updated successfully");
            } else {
                if (record.trophies_won > record.no_of_participations)
                    toast.error('Number of trophies won can\'t be higher than the number of participations', {
                        position: toast.POSITION.BOTTOM_CENTER });
                else
                    alert("Error updating record");
                console.error('Error updating record:', response.statusText);
            }
            navigate(`/records`);
            setLoading(false);
        }).catch(error => {
            console.error('Error updating record1:', error);
            setLoading(false);
        });
    }

    const handleCancel = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		navigate("/records");
	};

    return (
        <Container>
            <ToastContainer />
            <RecordMenu />
            <Card>
				<CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/records`}>
						<ArrowBackIcon />
					</IconButton>{" "}
                    <form onSubmit={updateRecord} style={{display: "flex", flexDirection: "column", padding: "8px"}}>
                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Club
                            </FormLabel>
                            <Autocomplete
                                disableClearable
                                disabled
                                style={{width: "250px", fontSize: "18px"}}
                                id="club_id"
                                options={clubs}
                                getOptionLabel={(option) => `${option.name} - ${option.country}`}
                                value={club.current}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </Container>
    
                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Competition
                            </FormLabel>
                            <Autocomplete
                                disableClearable
                                disabled
                                style={{width: "250px", fontSize: "18px"}}
                                id="competition_id"
                                options={competitions}
                                getOptionLabel={(option) => `${option.name}`}
                                value={competition.current}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </Container>

                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Trophies Won
                            </FormLabel>
                            <TextField
                                id="trophies_won"
                                variant="outlined"
                                value={record.trophies_won}
                                onChange={(event) => setRecord({ ...record, trophies_won: Number(event.target.value) })}
                            />
                        </Container>

                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Participations
                            </FormLabel>
                            <TextField
                                id="no_of_participations"
                                variant="outlined"
                                value={record.no_of_participations}
                                onChange={(event) => setRecord({ ...record, no_of_participations: Number(event.target.value) })}
                            />
                        </Container>
                    </form>
				</CardContent>
				<CardActions sx={{ justifyContent: "center" }}>
					<Button type="submit" onClick={updateRecord} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Update</Button>
                    <Button onClick={handleCancel} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Cancel</Button>
				</CardActions>
               
			</Card>
        </Container>
    );
}