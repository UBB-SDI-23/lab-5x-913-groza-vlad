import { CssBaseline, Container, Typography } from "@mui/material";
import React from "react";
import { AppMenu } from "./AppMenu";

export const HomePage = () => {
	return (
		<React.Fragment>
			<CssBaseline />

			<Container maxWidth="xl">
				<AppMenu />
				<Typography variant="h3" component="h3" gutterBottom>
					Welcome! Use the menu above to navigate.
				</Typography>
			</Container>
		</React.Fragment>
	);
};