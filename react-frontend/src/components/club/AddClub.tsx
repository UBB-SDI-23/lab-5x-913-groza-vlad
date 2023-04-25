import { Link, useNavigate } from "react-router-dom";
import { FootballClub } from "../../models/FootballClub";
import { useState } from "react";
import { BACKEND_URL } from "../../utils";
import { Button, Card, CardContent, Container, IconButton, TextField, FormLabel, colors } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useForm } from "react-hook-form";
import { ClubMenu } from "./ClubMenu";


export const AddClub = () => {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    // const { register, handleSubmit } = useForm<FootballClub>();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');


    const [club, setClub] = useState<FootballClub>({
        name: "",
        establishment_year: 0,
        country: "",
        city: "",
        budget: 0,
        home_kit: "",
    });

    // const addClub = async (event: { preventDefault: () => void }) => {
    //     event.preventDefault();
	// 	try {
	// 		await axios.post(`${BACKEND_URL}/clubs/`, club);
	// 		navigate("/clubs");
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
    // }

    const [validEstYear, setValidEstYear] = useState(true);

    const handleEstYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const est_year = event.target.value;
        setClub({ ...club, establishment_year: Number(est_year)});
        if (parseInt(est_year) >=1850 && parseInt(est_year) <= 2023)
            setValidEstYear(true);
        else
            setValidEstYear(false);
    };

    const addClub = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch(`${BACKEND_URL}/clubs/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(club),
            });
            if (response.ok) {
                setOpen(true);
                setMessage('Club added successfully');
                // setSeverity('success');
                alert("Club added successfully");
            }
            else {
                setOpen(true);
                setMessage('Failed to add club');
                // setSeverity('error');
                alert("Failed to add club");
            }
            navigate("/clubs");
        } catch (error) {
            console.error(error);
            alert("Failed to add club");
        }
        setSubmitting(false);
    };

    return (
        <Container>
            <ClubMenu />
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
                            <TextField onChange={(event) => setClub({ ...club, name: event.target.value })}>
                                id="name"
                                label="Club name"
                                variant="outlined"
                            </TextField>
                        </Container>
    
                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Establishment year
                            </FormLabel>
                            <TextField error={!validEstYear} onChange={handleEstYearChange}>
                                id="establishment_year"
                                label="Establishment year"
                                variant="outlined"
                            </TextField>
                        </Container>

                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Country
                            </FormLabel>
                            <TextField onChange={(event) => setClub({ ...club, country: event.target.value })}>
                                id="country"
                                label="Country"
                                variant="outlined"
                            </TextField>
                        </Container>

                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                City
                            </FormLabel>
                            <TextField onChange={(event) => setClub({ ...club, city: event.target.value })}>
                                id="city"
                                label="City"
                                variant="outlined"
                            </TextField>
                        </Container>
                        
                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Budget
                            </FormLabel>
                            <TextField onChange={(event) => setClub({ ...club, budget: Number(event.target.value) })}>
                                id="budget"
                                label="Budget"
                                variant="outlined"
                            </TextField>
                        </Container>
                        
                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Home kit
                            </FormLabel> 
                            <TextField onChange={(event) => setClub({ ...club, home_kit: event.target.value })}>
                                id="home_kit"
                                label="Home kit"
                                variant="outlined"
                            </TextField>
                        </Container>

                        <Button type="submit" variant="contained" sx={{ backgroundColor: colors.green[500] }}>Add club</Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}