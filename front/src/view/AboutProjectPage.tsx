import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { Header } from "../components/Header";

export const AboutProjectPage = () => {
  const projectDetails = [
    {
      title: "Scientific Achievements",
      description:
        "We have written two research papers and successfully published them in journals.",
    },
    {
      title: "Dataset Creation",
      description:
        "Developed a unique dataset of speech with hyperkinetic dysarthria, comprising approximately 3,500 audio files from three individuals speaking Russian.",
    },
    {
      title: "Neural Network Model",
      description:
        "Created a proprietary neural network model capable of recognizing symbols with 86% accuracy and converting entire messages with 42% accuracy.",
    },
    {
      title: "Conference Success",
      description:
        "Participated in the INTER IRIT-RTF scientific conference, securing 1st place for the best work. Achieved 2nd place in the 'Best in Project-Based Learning' competition.",
    },
    {
      title: "Scholarships and Recognition",
      description:
        "Received scholarships from the AI division of IRIT-RTF for achievements in scientific research.",
    },
    {
      title: "Intellectual Property",
      description:
        "Registered four intellectual property certificates to protect our innovations.",
    },
    {
      title: "Accelerator Participation",
      description:
        "Participated in the Ural Federal University Accelerator program, among other activities.",
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
          About the Project
        </Typography>
        <Grid container spacing={4}>
          {projectDetails.slice(0, -1).map((detail, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {detail.title}
                </Typography>
                <Typography variant="body1">{detail.description}</Typography>
              </Paper>
            </Grid>
          ))}
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Paper elevation={3} sx={{ padding: 3, maxWidth: 600 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                {projectDetails[projectDetails.length - 1].title}
              </Typography>
              <Typography variant="body1">
                {projectDetails[projectDetails.length - 1].description}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
