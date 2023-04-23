import { Link, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { BACKEND_URL } from "../../utils";
import { Button, Card, CardContent, Container, IconButton, TextField, FormLabel, colors, Autocomplete } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FootballClub } from "../../models/FootballClub";
import { Record } from "../../models/Record";
import axios from "axios";
import { debounce } from "lodash";
import { RecordMenu } from "./RecordMenu";
import { Competition } from "../../models/Competition";

export const AddRecord = () => {
    const navigate = useNavigate();
    // const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);

    const [record, setRecord] = useState<Record>({
		id: 0,
        trophies_won: 0,
        no_of_participations: 0,
        club_id: 1,
        competition_id: 1,
	});

    const [clubs, setClubs] = useState<FootballClub[]>([]);
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    
    // const addPlayer = async (event: { preventDefault: () => void }) => {
    //     event.preventDefault();
	// 	try {
	// 		await axios.post(`${BACKEND_URL}/players/`, player)
    //         .then(() => {
    //             alert("Player added successfully!");
    //         })
    //         .catch((reason: AxiosError) => {
    //             console.log(reason.message);
    //             alert("Failed to add player!");
    //         });
	// 		navigate("/players");
	// 	} catch (error) {
	// 		console.log(error);
    //         alert("Failed to add player");
	// 	}
    // };

    const addRecord = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setLoading(true);
        fetch(`${BACKEND_URL}/records/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(record)
        }).then(response => {
            if (response.ok) {
                alert("Record added successfully!");
            } else {
                console.error('Error adding record:', response.statusText);
                alert("Failed to add record")
            }
            navigate(`/records`);
            setLoading(false);
        }).catch(error => {
            console.error('Error adding record:', error);
            alert("Failed to add record");
            setLoading(false);
        });
    }

    const fetchSuggestions = async (query: string) => {
		try {
			const response1 = await axios.get(
				`${BACKEND_URL}/clubs/`
			);
            const response2 = await axios.get(
				`${BACKEND_URL}/competitions/`
			);
			const clubs_data = await response1.data.results;
            const competitions_data = await response2.data.results;
			setClubs(clubs_data);
            setCompetitions(competitions_data);
		} catch (error) {
			console.error("Error fetching suggestions:", error);
		}
	};

    const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), []);

	useEffect(() => {
		return () => {
			debouncedFetchSuggestions.cancel();
		};
	}, [debouncedFetchSuggestions]);

    const handleInputChange = (event: any, value: any, reason: any) => {
		console.log("input", value, reason);

		if (reason === "input") {
			debouncedFetchSuggestions(value);
		}
	};

    return (
        <Container>
            <RecordMenu />
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/records`}>
						<ArrowBackIcon />
					</IconButton>{" "}
                    <form onSubmit={addRecord} style={{display: "flex", flexDirection: "column", padding: "8px"}}>
                    <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Club
                            </FormLabel>
                            <Autocomplete
                                disableClearable
                                style={{width: "250px", fontSize: "18px"}}
                                id="club_id"
                                options={clubs}
                                getOptionLabel={(option) => `${option.name} - ${option.country}`}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                renderOption={(props, option) => {
                                    return (
                                        <li {...props} key={option.id}>
                                            {option.name}, {option.country}
                                        </li>
                                    );
                                }}
                                filterOptions={(x) => x}
                                onInputChange={handleInputChange}
                                onChange={(event, value) => {
                                    if (value) {
                                        console.log(value);
                                        setRecord({ ...record, club_id: value.id });
                                    }
                                }}
                            />
                        </Container>
    
                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Competition
                            </FormLabel>
                            <Autocomplete
                                disableClearable
                                style={{width: "250px", fontSize: "18px"}}
                                id="competition_id"
                                options={competitions}
                                getOptionLabel={(option) => `${option.name}`}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                renderOption={(props, option) => {
                                    return (
                                        <li {...props} key={option.id}>
                                            {option.name}
                                        </li>
                                    );
                                }}
                                filterOptions={(x) => x}
                                onInputChange={handleInputChange}
                                onChange={(event, value) => {
                                    if (value) {
                                        console.log(value);
                                        setRecord({ ...record, competition_id: value.id });
                                    }
                                }}
                            
                            />
                        </Container>

                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Trophies Won
                            </FormLabel>
                            <TextField
                                id="trophies_won"
                                variant="outlined"
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
                                onChange={(event) => setRecord({ ...record, no_of_participations: Number(event.target.value) })}
                            />
                        </Container>

                        <Button type="submit" variant="contained" sx={{ backgroundColor: colors.green[500] }}>Add record</Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}