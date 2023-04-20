import { CssBaseline, Container, Typography } from "@mui/material";
import React from "react";
import { CompetitionMenu } from "./CompetitionMenu";

export const CompetitionHomePage = () => {
    
	return (
		<React.Fragment>
			<CssBaseline />

			<Container maxWidth="xl">
                <CompetitionMenu />
				<Typography variant="h4" component="h4" gutterBottom>
					Use the menu above to manage the competitions
				</Typography>
			</Container>
		</React.Fragment>
	);
};