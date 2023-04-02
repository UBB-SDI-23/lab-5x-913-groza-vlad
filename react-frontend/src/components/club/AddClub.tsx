import { Link, useNavigate } from "react-router-dom";
import { FootballClub } from "../../models/FootballClub";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utils";
import { Button, Card, CardActions, CardContent, Container, IconButton, TextField, FormLabel, colors } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useForm } from "react-hook-form";


export const AddClub = () => {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const { register, handleSubmit } = useForm<FootballClub>();

    // const addClub = async (event: { preventDefault: () => void }) => {
    //     event.preventDefault();
	// 	try {
	// 		await axios.post(`${BACKEND_URL}/clubs/`, club);
	// 		navigate("/clubs");
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
    // }

    const addClub = async (data: FootballClub) => {
        setSubmitting(true);
        try {
            const response = await fetch(`${BACKEND_URL}/clubs/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            });
            if (response.ok)
                alert("Club added successfully");
            else 
                alert("Failed to add club");
            navigate("/clubs");
        } catch (error) {
            console.error(error);
            alert("Failed to add club");
        }
        setSubmitting(false);
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/clubs`}>
						<ArrowBackIcon />
					</IconButton>{" "}
                    <form onSubmit={handleSubmit(addClub)} style={{display: "flex", flexDirection: "column", padding: "8px"}}>
                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Club name
                            </FormLabel>
                            <TextField {...register("name")}>
                                id="name"
                                label="Club name"
                                variant="outlined"
                            </TextField>
                        </Container>
    
                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Establishment year
                            </FormLabel>
                            <TextField {...register("establishment_year")}>
                                id="establishment_year"
                                label="Establishment year"
                                variant="outlined"
                            </TextField>
                        </Container>

                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Country
                            </FormLabel>
                            <TextField {...register("country")}>
                                id="country"
                                label="Country"
                                variant="outlined"
                            </TextField>
                        </Container>

                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                City
                            </FormLabel>
                            <TextField {...register("city")}>
                                id="city"
                                label="City"
                                variant="outlined"
                            </TextField>
                        </Container>
                        
                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Budget
                            </FormLabel>
                            <TextField {...register("budget")}>
                                id="budget"
                                label="Budget"
                                variant="outlined"
                            </TextField>
                        </Container>
                        
                        <Container sx={{padding: "3px"}} style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Home kit
                            </FormLabel> 
                            <TextField {...register("home_kit")}>
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