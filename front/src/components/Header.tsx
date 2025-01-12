import { AppBar, Toolbar, Typography, Link, Box } from "@mui/material";

export const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2", padding: 1 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Voice Assistant for People with Speech Disorders
        </Typography>
        <Box>
          <Link href="/" color="inherit" sx={{ margin: 2 }}>
            Home
          </Link>
          <Link href="/aboutus" color="inherit" sx={{ margin: 2 }}>
            About Us
          </Link>
          <Link href="/aboutproject" color="inherit" sx={{ margin: 2 }}>
            About Project
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
