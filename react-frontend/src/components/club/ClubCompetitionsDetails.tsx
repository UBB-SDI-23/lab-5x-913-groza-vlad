import { Card, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FootballClub } from "../../models/FootballClub";
import { BACKEND_URL } from "../../utils";
import { ClubMenu } from "./ClubMenu";

export const ClubCompetitionsDetails = () => {
	const { clubId } = useParams();
	const [club, setClub] = useState<FootballClub>();

	useEffect(() => {
		const fetchClub = async () => {
			const response = await fetch(`${BACKEND_URL}/clubs/${clubId}/competitions/`);
			const club = await response.json();
			setClub(club);
		};
		fetchClub();
	}, [clubId]);

	return (
		<Container>
			<ClubMenu />
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/clubs`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h3>Club Competitions Details</h3>
					<p>Club Name: {club?.name}</p>
					<p>Club established: {club?.establishment_year}</p>
                    <p style={{textAlign: "left", marginLeft: "12px"}}>Competitions:</p>
					<ul>
						{club?.competitions?.map((competition) => (
                            <li key={competition.id}>{competition.name}</li>
						))}
					</ul>
				</CardContent>
			</Card>
		</Container>
	);
};