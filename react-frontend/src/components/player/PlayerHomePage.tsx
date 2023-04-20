import { CssBaseline, Container, Typography } from "@mui/material";
import React from "react";
import { PlayerMenu } from "./PlayerMenu";

export const PlayerHomePage = () => {
    
	return (
		<React.Fragment>
			<CssBaseline />

			<Container maxWidth="xl">
                <PlayerMenu />
				<Typography variant="h4" component="h4" gutterBottom>
					Use the menu above to manage the players
				</Typography>
			</Container>
		</React.Fragment>
	);
};