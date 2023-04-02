import { Card, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FootballClub } from "../../models/FootballClub";
import { BACKEND_URL } from "../../utils";


export const ClubPlayersDetails = () => {
	const { clubId } = useParams();
	const [club, setClub] = useState<FootballClub>();

	useEffect(() => {
		const fetchClub = async () => {
			const response = await fetch(`${BACKEND_URL}/clubs/${clubId}/players/`);
			const club = await response.json();
			setClub(club);
		};
		fetchClub();
	}, [clubId]);

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/clubs`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h3>Club Players Details</h3>
					<p>Club Name: {club?.name}</p>
					<p>Club established: {club?.establishment_year}</p>
					<p style={{textAlign: "left", marginLeft: "12px"}}>Club players:</p>
					<ul>
						{club?.players?.map((player) => (
                            <li key={player.id}>{player.first_name} {player.last_name} {" -> "} {player.position}</li>
						))}
					</ul>
				</CardContent>
			</Card>
		</Container>
	);
};