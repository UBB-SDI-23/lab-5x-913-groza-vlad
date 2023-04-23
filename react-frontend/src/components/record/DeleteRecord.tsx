import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../utils";
import { Button, Card, CardActions, CardContent, Container, colors } from "@mui/material";
import { RecordMenu } from "./RecordMenu";


export const DeleteRecord = () => {
    const { recordId } = useParams();
    const navigate = useNavigate();

    const deleteRecord = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
		await axios.delete(`${BACKEND_URL}/records/${recordId}/`);
		navigate("/records");
    }

    const handleCancel = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		navigate("/records");
	};

    return (
        <Container>
			<RecordMenu />
            <Card>
				<CardContent>
					Are you sure you want to delete this record?
				</CardContent>
				<CardActions sx={{ justifyContent: "center" }}>
					<Button onClick={deleteRecord} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Delete</Button>
					<Button onClick={handleCancel} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Cancel</Button>
				</CardActions>
			</Card>
        </Container>
    );
}