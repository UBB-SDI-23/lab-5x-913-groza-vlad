import { Card, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BACKEND_URL } from "../../utils";
import { Record } from "../../models/Record";
import { RecordMenu } from "./RecordMenu";

export const RecordDetails = () => {
	const { recordId } = useParams();
	const [record, setRecord] = useState<any>();

	useEffect(() => {
		const fetchClub = async () => {
			const response = await fetch(`${BACKEND_URL}/records/${recordId}`);
			const record = await response.json();
			setRecord(record);
		};
		fetchClub();
	}, [recordId]);

	return (
		<Container>
			<RecordMenu />
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/records`}>
						<ArrowBackIcon />
					</IconButton>{" "}
                    <Container sx={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
                        <Container>
                            <h3> - Football Club -</h3>
                            <p>Club Name: {record?.club?.name}</p>
                            <p>Club established: {record?.club?.establishment_year}</p>
                            <p>Country: {record?.club?.country}</p>
                            <p>City: {record?.club?.city}</p>
                            <p>Budget: {record?.club?.budget}</p>
                            <p>Home Kit: {record?.club?.home_kit}</p>
                        </Container>
                        <Container>
                            <h3> - Competition -</h3>
                            <p>Name: {record?.competition?.name}</p>
                            <p>Number of participants: {record?.competition?.number_of_participants}</p>
                            <p>Total prizes: {record?.competition?.total_prizes}</p>
                            <p>Knockout stages: {record?.competition?.ko_stages ? "Yes" : "No"}</p>
                            <p>Edition: {record?.competition?.edition}</p>
                        </Container>
                    </Container>
                    
				</CardContent>
			</Card>
		</Container>
	);
};