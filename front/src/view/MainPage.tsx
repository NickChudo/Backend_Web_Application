import { useState } from "react";
import { Header } from "../components/Header";
import {
  Grid,
  Box,
  Button,
  OutlinedInput,
  Typography,
  Paper,
} from "@mui/material";
import { AudioRecorder } from "react-audio-voice-recorder";

export const MainPage = () => {
  const [result, setResult] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [pred, setPred] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/get_prediction", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const prediction = JSON.stringify(data)
          .substring(15)
          .replace('"', "")
          .replace("}", "");
        setPred(prediction);
      } else {
        console.error("Error uploading file");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleVoice = async (voice: Blob) => {
    const formData = new FormData();
    formData.append("file", voice);

    try {
      const response = await fetch("http://127.0.0.1:8000/get_prediction", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      const prediction = JSON.stringify(data)
        .substring(15)
        .replace('"', "")
        .replace("}", "");
      setPred(prediction);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const pronounceResult = (string: string) => {
    if (!string.trim()) {
      alert("Please enter some text to pronounce!");
      return;
    }
    const speech = new SpeechSynthesisUtterance(string);
    window.speechSynthesis.speak(speech);
  };

  return (
    <>
      <Header />
      <Grid container justifyContent="center" spacing={4} sx={{ padding: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Upload File or Record Audio
            </Typography>
            <form onSubmit={handleSubmit}>
              <OutlinedInput
                type="file"
                onChange={handleFileChange}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <Grid
                container
                spacing={2}
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <Grid item>
                  <Button variant="contained" type="submit">
                    Upload
                  </Button>
                </Grid>
                <Grid item>
                  <AudioRecorder
                    audioTrackConstraints={{
                      noiseSuppression: true,
                      echoCancellation: true,
                    }}
                    downloadOnSavePress={true}
                    downloadFileExtension="webm"
                    onRecordingComplete={handleVoice}
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
            <Typography variant="h6">Result</Typography>
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: 1,
                padding: 2,
                marginTop: 2,
              }}
            >
              {pred || "Result will be displayed here"}
            </Box>
            <Button
              variant="outlined"
              sx={{ marginTop: 2 }}
              onClick={() => pronounceResult(pred)}
              disabled={!pred}
            >
              Pronounce Result
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            The application is an "outer wrapper" for a neural network made for
            a research project. The model is trained on the voice of one
            specific person, so it may generate unintended results. It supports
            voice-to-text recognition and text-to-speech features.
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
