import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { Header } from "../components/Header";

export const AboutUsPage = () => {
  const teamMembers = [
    {
      name: "Bachurin Matvey",
      role: "Team Lead / Analyst",
      description:
        "Coordinates the team’s actions, monitors and reminds the team about deadlines, helps the entire team form a unified view of the task at hand, is the main communicator in the team (both internally and with the outside world), decomposes tasks for the team, participates in writing scientific papers, filling out documents, speaking at conferences, and defending a project workshop (checkpoints).",
    },
    {
      name: "Nikolay Chudinovskikh",
      role: "Developer",
      description:
        "The main creator of ideas and results, responsible for the code, searching for methods, proposals for optimizing and improving the product, and was involved in the development of the backend of the application.",
    },
    {
      name: "Aleksey Shurpikov",
      role: "Analyst / Researcher / Frontend",
      description:
        "Responsible for creating presentations, writing reports, and filling out applications both for checkpoints and defense of a project workshop, and for other competitions/conferences and journals. Participates in writing scientific papers, processing them, is responsible for recording and collecting a dataset, and writing the frontend part of the web application.",
    },
  ];

  return (
    <>
      <Header />
      <Container>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ textAlign: "center", marginTop: "50px" }}
        >
          About Us
        </Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Paper elevation={3} sx={{ padding: 3, height: "100%" }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {member.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  {member.role}
                </Typography>
                <Typography variant="body1">{member.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};
