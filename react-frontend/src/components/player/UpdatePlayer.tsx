import { Autocomplete, Button, Card, CardActions, CardContent, Container, FormLabel, IconButton, TextField, colors } from "@mui/material";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../utils";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FootballClub } from "../../models/FootballClub";
import { useCallback, useEffect, useRef, useState } from "react";
import { PlayerMenu} from "./PlayerMenu";
import { FootballPlayer } from "../../models/FootballPlayer";
import { debounce } from "lodash";


export const UpdatePlayer= () => {
    const { playerId } = useParams<{ playerId: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [clubs, setClubs] = useState<FootballClub[]>([]);

    const [player, setPlayer] = useState<FootballPlayer>({
        id: parseInt(String(playerId)),
        first_name: "",
        last_name: "",
        nationality: "",
        age: 0,
        position: "",
        club_id: 1,
    });

    const club = useRef<FootballClub>({
        name: "",
        establishment_year: 0,
        country: "",
        city: "",
        budget: 0,
        home_kit: "",
    })

    const validPositions = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'];
    const [validPosition, setValidPosition] = useState(true);

    const handlePositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const position = event.target.value;
        setPlayer({ ...player, position });
        setValidPosition(validPositions.includes(position));
    };

    const [validAge, setValidAge] = useState(true);
    const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const age = Number(event.target.value);
        setPlayer({ ...player, age });
        setValidAge(age >= 16 && age <= 40);
    };

    useEffect(() => {
        // setLoading(true);
        // fetch(`${BACKEND_URL}/players/${playerId}/`).then(response => response.json()).then(data => {
        //   setPlayer(data);
        //   setLoading(false);
        // });
        const fetchPlayer = async () => {
            const response = await fetch(
                `${BACKEND_URL}/players/${playerId}/`);


            const player = await response.json();
            const fetchedClub = {
                id: player.club.id,
                name: player.club.name,
                establishment_year: player.club.establishment_year,
                country: player.club.country,
                city: player.club.city,
                budget: player.club.budget,
                home_kit: player.club.home_kit,
                competitions: player.club.competitions,
                players: player.club.players,
            };
            club.current = fetchedClub;
            setClubs([club.current]);

            setPlayer({
                id: player.id,
                first_name: player.first_name,
                last_name: player.last_name,
                nationality: player.nationality,
                age: player.age,
                position: player.position,
                club_id: fetchedClub.id,
                club: fetchedClub,
            });

            setLoading(false);
        };
        fetchPlayer();
      }, [playerId]);

    const updatePlayer = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setLoading(true);
        fetch(`${BACKEND_URL}/players/${playerId}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(player)
        }).then(response => {
            if (response.ok) {
                alert("Player updated successfully");
            } else {
                console.error('Error updating player:', response.statusText);
                alert("Error updating player")
            }
            navigate(`/players`);
            setLoading(false);
        }).catch(error => {
            console.error('Error updating player:', error);
            setLoading(false);
        });
    }

    const handleCancel = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		navigate("/players");
	};

    const fetchSuggestions = async (query: string) => {
		try {
			const response = await axios.get(
				`${BACKEND_URL}/clubs/`
			);
			const data = await response.data.results;
            data.unshift(club.current);
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
                    <form onSubmit={updatePlayer} style={{display: "flex", flexDirection: "column", padding: "8px"}}>
                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                First Name
                            </FormLabel>
                            <TextField
                                id="first_name"
                                variant="outlined"
                                value={player.first_name}
                                onChange={(event) => setPlayer({ ...player, first_name: event.target.value })}
                            />
                        </Container>
    
                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Last Name
                            </FormLabel>
                            <TextField
                                id="last_name"
                                variant="outlined"
                                value={player.last_name}
                                onChange={(event) => setPlayer({ ...player, last_name: event.target.value })}
                            />
                        </Container>

                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Nationality
                            </FormLabel>
                            <TextField
                                id="nationality"
                                variant="outlined"
                                value={player.nationality}
                                onChange={(event) => setPlayer({ ...player, nationality: event.target.value })}
                            />
                        </Container>

                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Age
                            </FormLabel>
                            <TextField
                                id="age"
                                variant="outlined"
                                value={player.age}
                                error={!validAge} 
                                onChange={handleAgeChange}
                            />
                        </Container>
                        
                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Position
                            </FormLabel>
                            <TextField
                                id="position"
                                variant="outlined"
                                value={player.position}
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
                                value={club.current}
                                renderOption={(props, option) => {
                                    return (
                                        <li {...props} key={option.id}>
                                            {option.name}, {option.country}
                                        </li>
                                    );
                                }}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                filterOptions={(x) => x}
                                onInputChange={handleInputChange}
                                onChange={(event, value) => {
                                    if (value) {
                                        console.log(value);
                                        club.current = value;
                                        setPlayer({ ...player, club: value.id! as any as FootballClub });
                                    }
                                }}
                            />
                        </Container>
                    </form>
				</CardContent>
				<CardActions sx={{ justifyContent: "center" }}>
					<Button type="submit" onClick={updatePlayer} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Update</Button>
					<Button onClick={handleCancel} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Cancel</Button>
				</CardActions>
			</Card>
        </Container>
    );
}