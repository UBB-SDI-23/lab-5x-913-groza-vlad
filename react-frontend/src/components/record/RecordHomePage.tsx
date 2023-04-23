import { CssBaseline, Container, Typography } from "@mui/material";
import React from "react";
import { RecordMenu } from "./RecordMenu";

export const RecordHomePage = () => {
    
	return (
		<React.Fragment>
			<CssBaseline />

			<Container maxWidth="xl">
                <RecordMenu />
				<Typography variant="h4" component="h4" gutterBottom>
					Use the menu above to manage the records
				</Typography>
			</Container>
		</React.Fragment>
	);
};