import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../utils";
import { Button, Card, CardActions, CardContent, Container, colors } from "@mui/material";
import { CompetitionMenu } from "./CompetitionMenu";


export const DeleteCompetition = () => {
    const { competitionId } = useParams();
    const navigate = useNavigate();

    const deleteCompetition = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
		await axios.delete(`${BACKEND_URL}/competitions/${competitionId}/`);
		navigate("/competitions");
    }

    const handleCancel = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		navigate("/competitions");
	};

    return (
        <Container>
			<CompetitionMenu />
            <Card>
				<CardContent>
					Are you sure you want to delete this competition?
				</CardContent>
				<CardActions sx={{ justifyContent: "center" }}>
					<Button onClick={deleteCompetition} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Delete</Button>
					<Button onClick={handleCancel} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Cancel</Button>
				</CardActions>
			</Card>
        </Container>
    );
}