import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";


export const AppMenu = () => {
    const location = useLocation();
	const path = location.pathname;

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" sx={{ marginBottom: "20px" }}>
				<Toolbar>
					<IconButton
						component={Link}
						to="/"
						size="large"
						edge="start"
						color="inherit"
						aria-label="school"
						sx={{ mr: 2 }}>
					</IconButton>
					<Typography variant="h6" component="div" sx={{ mr: 5 }}>
						Club management
					</Typography>
					<Button
						variant={path.startsWith("/clubs") ? "outlined" : "text"}
						to="/clubs"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LocalLibraryIcon />}>
						Clubs
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	)
}