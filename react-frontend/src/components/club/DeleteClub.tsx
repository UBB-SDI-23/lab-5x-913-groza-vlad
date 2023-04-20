import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../utils";
import { Button, Card, CardActions, CardContent, Container, colors } from "@mui/material";
import { ClubMenu } from "./ClubMenu";


export const DeleteClub = () => {
    const { clubId } = useParams();
    const navigate = useNavigate();

    const deleteClub = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
		await axios.delete(`${BACKEND_URL}/clubs/${clubId}/`);
		navigate("/clubs");
    }

    const handleCancel = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		navigate("/clubs");
	};

    return (
        <Container>
			<ClubMenu />
            <Card>
				<CardContent>
					Are you sure you want to delete this football club?
				</CardContent>
				<CardActions sx={{ justifyContent: "center" }}>
					<Button onClick={deleteClub} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Delete</Button>
					<Button onClick={handleCancel} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Cancel</Button>
				</CardActions>
			</Card>
        </Container>
    );
}