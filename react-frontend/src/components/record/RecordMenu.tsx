import { AppBar, Box, Button, Toolbar, Typography, colors } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import AddIcon from '@mui/icons-material/Add';


export const RecordMenu = () => {
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
                Records management
            </Typography>
            <Button
                variant={path.startsWith("/records") ? "outlined" : "text"}
                to="/records"
                component={Link}
                color="inherit"
                sx={{ mr: 4 }}
                startIcon={<LocalLibraryIcon />}>
                Records
            </Button>
            <Button
                variant={path.startsWith("/records/add") ? "outlined" : "text"}
                to="/records/add"
                component={Link}
                color="inherit"
                sx={{ mr: 4 }}
                startIcon={<AddIcon />}>
                Add Record
            </Button>
        </Toolbar>
    </AppBar>
        </Box>
    )
}