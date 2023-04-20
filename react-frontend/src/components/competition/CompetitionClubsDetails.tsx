import { Card, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BACKEND_URL } from "../../utils";
import { CompetitionMenu } from "./CompetitionMenu";
import { Competition } from "../../models/Competition";

export const CompetitionClubsDetails = () => {
	const { competitionId } = useParams();
	const [competition, setCompetition] = useState<Competition>();

	useEffect(() => {
		const fetchClub = async () => {
			const response = await fetch(`${BACKEND_URL}/competitions/${competitionId}/clubs/`);
			const competition = await response.json();
			setCompetition(competition);
		};
		fetchClub();
	}, [competitionId]);

	return (
		<Container>
			<CompetitionMenu />
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/competitions`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h3>Competition Clubs Details</h3>
					<p>Competition Name: {competition?.name}</p>
                    <p style={{textAlign: "left", marginLeft: "12px"}}>Clubs:</p>
					<ul>
						{competition?.clubs?.map((club) => (
                            <li key={club.id}>{club.name} - {club.country}</li>
						))}
					</ul>
				</CardContent>
			</Card>
		</Container>
	);
};