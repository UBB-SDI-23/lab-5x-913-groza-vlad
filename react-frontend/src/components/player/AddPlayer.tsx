import { Link, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { BACKEND_URL } from "../../utils";
import { Button, Card, CardContent, Container, IconButton, TextField, FormLabel, colors, Autocomplete } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useForm } from "react-hook-form";
import { FootballPlayer } from "../../models/FootballPlayer";
import { PlayerMenu } from "./PlayerMenu";
import { FootballClub } from "../../models/FootballClub";
import axios, { AxiosError } from "axios";
import { debounce } from "lodash";

export const AddPlayer = () => {
    const navigate = useNavigate();
    // const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);

    const [player, setPlayer] = useState<FootballPlayer>({
		first_name: "",
		last_name: "",
		nationality: "",
        age: 0,
        position: "",
        club: 1,
	});

    const [clubs, setClubs] = useState<FootballClub[]>([]);
    
    const validPositions = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'];
    const [validPosition, setValidPosition] = useState(true);
    const [validAge, setValidAge] = useState(true);

    const handlePositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const position = event.target.value;
        setPlayer({ ...player, position });
        setValidPosition(validPositions.includes(position));
    };

    const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const age = Number(event.target.value);
        setPlayer({ ...player, age });
        setValidAge(age >= 16 && age <= 40);
    };
        
    
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

    const addPlayer = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setLoading(true);
        fetch(`${BACKEND_URL}/players/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(player)
        }).then(response => {
            if (response.ok) {
                alert("Player added successfully!");
            } else {
                console.error('Error adding player:', response.statusText);
                alert("Failed to add player")
            }
            navigate(`/players`);
            setLoading(false);
        }).catch(error => {
            console.error('Error adding player:', error);
            setLoading(false);
        });
    }

    const fetchSuggestions = async (query: string) => {
		try {
			const response = await axios.get<FootballClub[]>(
				`${BACKEND_URL}/clubs/autocomplete?query=${query}`
			);
			const data = await response.data;
			setClubs(data);
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
            <PlayerMenu />
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/players`}>
						<ArrowBackIcon />
					</IconButton>{" "}
                    <form onSubmit={addPlayer} style={{display: "flex", flexDirection: "column", padding: "8px"}}>
                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                First name
                            </FormLabel>
                            <TextField onChange={(event) => setPlayer({ ...player, first_name: event.target.value })} />
                        </Container>
    
                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Last name
                            </FormLabel>
                            <TextField onChange={(event) => setPlayer({ ...player, last_name: event.target.value})}/>
                        </Container>

                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Nationality
                            </FormLabel>
                            <TextField onChange={(event) => setPlayer({ ...player, nationality: event.target.value})}/>
                        </Container>

                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Age
                            </FormLabel>
                            <TextField error={!validAge} onChange={handleAgeChange}/>
                        </Container>

                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Position
                            </FormLabel>
                            <TextField
                                error={!validPosition}
                                onChange={handlePositionChange}
                            />
                        </Container>

                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Club
                            </FormLabel>
                            <Autocomplete
                                style={{width: "250px", fontSize: "18px"}}
                                id="club_id"
                                options={clubs}
                                getOptionLabel={(option) => `${option.name} - ${option.country}`}
                                renderInput={(params) => <TextField {...params} variant="outlined" label="Club" />}
                                filterOptions={(x) => x}
                                onInputChange={handleInputChange}
                                onChange={(event, value) => {
                                    if (value) {
                                        console.log(value);
                                        setPlayer({ ...player, club: value.id });
                                    }
                                }}
                            />
                        </Container>

                        <Button type="submit" variant="contained" sx={{ backgroundColor: colors.green[500] }}>Add player</Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}