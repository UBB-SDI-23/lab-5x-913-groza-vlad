import { AppBar, Box, Button, Toolbar, Typography, colors } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import AddIcon from '@mui/icons-material/Add';
import SummarizeIcon from '@mui/icons-material/Summarize';

export const ClubMenu = () => {
    const location = useLocation();
	const path = location.pathname;

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ marginBottom: "20px", backgroundColor: colors.green[500] }}>
        <Toolbar>
            <Button
                to="/"
                component={Link}
                color="inherit"
                sx={{ mr: 2 }}
                startIcon={<HomeIcon />}>
            </Button>
            <Typography variant="h6" component="div" sx={{ mr: 5 }}>
                Club management
            </Typography>
            <Button
                variant={path.startsWith("/clubs") ? "outlined" : "text"}
                to="/clubs"
                component={Link}
                color="inherit"
                sx={{ mr: 4 }}
                startIcon={<LocalLibraryIcon />}>
                Clubs
            </Button>
            <Button
                variant={path.startsWith("/clubs/add") ? "outlined" : "text"}
                to="/clubs/add"
                component={Link}
                color="inherit"
                sx={{ mr: 4 }}
                startIcon={<AddIcon />}>
                Add Club
            </Button>
            <Button
                variant={path.startsWith("/clubs/most-trophies") ? "outlined" : "text"}
                to="/clubs/most-trophies"
                component={Link}
                color="inherit"
                sx={{ mr: 4 }}
                startIcon={<SummarizeIcon />}>
                Most trophies
            </Button>
            <Button
                variant={path.startsWith("/clubs/avg_age") ? "outlined" : "text"}
                to="/clubs/avg_age"
                component={Link}
                color="inherit"
                sx={{ mr: 4 }}
                startIcon={<SummarizeIcon />}>
                Average Age
            </Button>
        </Toolbar>
    </AppBar>
        </Box>
    )
}