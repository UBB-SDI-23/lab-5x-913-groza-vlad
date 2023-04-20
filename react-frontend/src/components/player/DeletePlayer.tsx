import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../utils";
import { Button, Card, CardActions, CardContent, Container, colors } from "@mui/material";
import { PlayerMenu } from "./PlayerMenu";


export const DeletePlayer = () => {
    const { playerId } = useParams();
    const navigate = useNavigate();

    const deletePlayer = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
		await axios.delete(`${BACKEND_URL}/players/${playerId}/`);
		navigate("/players");
    }

    const handleCancel = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		navigate("/players");
	};

    return (
        <Container>
			<PlayerMenu />
            <Card>
				<CardContent>
					Are you sure you want to delete this football player?
				</CardContent>
				<CardActions sx={{ justifyContent: "center" }}>
					<Button onClick={deletePlayer} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Delete</Button>
					<Button onClick={handleCancel} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Cancel</Button>
				</CardActions>
			</Card>
        </Container>
    );
}