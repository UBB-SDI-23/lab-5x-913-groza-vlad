import { AppBar, Box, Button, Toolbar, Typography, colors } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';

export const PlayerMenu = () => {
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
                Players management
            </Typography>
            <Button
                variant={path.startsWith("/players") ? "outlined" : "text"}
                to="/players"
                component={Link}
                color="inherit"
                sx={{ mr: 4 }}
                startIcon={<LocalLibraryIcon />}>
                Players
            </Button>
            <Button
                variant={path.startsWith("/players/add") ? "outlined" : "text"}
                to="/players/add"
                component={Link}
                color="inherit"
                sx={{ mr: 4 }}
                startIcon={<AddIcon />}>
                Add Player
            </Button>
            <Button
                variant={path.startsWith("/players/filter") ? "outlined" : "text"}
                to="/players/filter"
                component={Link}
                color="inherit"
                sx={{ mr: 4 }}
                startIcon={<FilterListIcon />}>
                Filter Players Age
            </Button>
        </Toolbar>
    </AppBar>
        </Box>
    )
}