import { Card, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { PlayerMenu } from "./PlayerMenu";
import { FootballPlayer } from "../../models/FootballPlayer";
import { BACKEND_URL } from "../../utils";

export const PlayerClubDetails = () => {
    const { playerId } = useParams();
	const [player, setPlayer] = useState<any>();

    useEffect(() => {
		const fetchClub = async () => {
			const response = await fetch(`${BACKEND_URL}/players/${playerId}/`);
			const player = await response.json();
			setPlayer(player);
		};
		fetchClub();
	}, [playerId]);

    return (
        <Container>
            <PlayerMenu />
            <Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/players`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h3>Player's club Details</h3>
					<p>Player Name: {player?.first_name} {player?.last_name}</p>
					<p style={{textAlign: "left", marginLeft: "296px"}}>Club Name: {player?.club?.name}</p>
                    <p style={{textAlign: "left", marginLeft: "296px"}}>Club established: {player?.club?.establishment_year}</p>
                    <p style={{textAlign: "left", marginLeft: "296px"}}>Country: {player?.club?.country}</p>
                    <p style={{textAlign: "left", marginLeft: "296px"}}>City: {player?.club?.city}</p>
                    <p style={{textAlign: "left", marginLeft: "296px"}}>Budget: {player?.club?.budget}</p>
                    <p style={{textAlign: "left", marginLeft: "296px"}}>Home Kit: {player?.club?.home_kit}</p>
				</CardContent>
			</Card>
        </Container>
    )
}