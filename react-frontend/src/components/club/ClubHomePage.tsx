import { CssBaseline, Container, Typography } from "@mui/material";
import React from "react";
import { ClubMenu } from "./ClubMenu";

export const ClubHomePage = () => {
    
	return (
		<React.Fragment>
			<CssBaseline />

			<Container maxWidth="xl">
                <ClubMenu />
				<Typography variant="h4" component="h4" gutterBottom>
					Use the menu above to manage the clubs
				</Typography>
			</Container>
		</React.Fragment>
	);
};