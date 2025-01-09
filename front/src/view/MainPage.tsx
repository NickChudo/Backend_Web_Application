import { useState } from "react";
import { Header } from "../components/Header";
import { Box, Button, OutlinedInput, Typography } from "@mui/material";
import { AudioRecorder } from "react-audio-voice-recorder";

export const MainPage = () => {
  function pronounceResult(string: string) {
    const textToPronounce = string;

    if (textToPronounce.trim() === "") {
      alert("Please enter some text to pronounce!");
      return;
    }
    const speech = new SpeechSynthesisUtterance(textToPronounce);
    window.speechSynthesis.speak(speech);
  }

  const handleVoice = async (voice: any) => {
    const formData = new FormData();
    formData.append("file", voice);

    try {
      const response = await fetch("http://127.0.0.1:8000/get_prediction", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(
        JSON.stringify(data).substring(15).replace('"', "").replace("}", "")
      );
      setPred(
        JSON.stringify(data).substring(15).replace('"', "").replace("}", "")
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const [result, setResult] = useState("");
  const [file, setFile] = useState(null);
  const [pred, setPred] = useState("");
  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    // Create a FormData object
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/get_prediction", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(
          JSON.stringify(data).substring(15).replace('"', "").replace("}", "")
        );
        setPred(
          JSON.stringify(data).substring(15).replace('"', "").replace("}", "")
        );
      } else {
        console.error("Error uploading file");
        const errorText = await response.text();
        console.error("Response text:", errorText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="fields">
        <form onSubmit={handleSubmit} className="form">
          <OutlinedInput type="file" onChange={handleFileChange} />
          <Button variant="contained" type="submit">
            Upload
          </Button>
          <AudioRecorder
            audioTrackConstraints={{
              noiseSuppression: true,
              echoCancellation: true,
            }}
            downloadOnSavePress={true}
            downloadFileExtension="webm"
            onRecordingComplete={(voice: any) => handleVoice(voice)}
          />
        </form>
        <Box
          sx={{
            width: 400,
            height: 80,
            borderRadius: 1,
            border: "1px solid black",
            textAlign: "center",
            padding: 0,
            margin: 0,
          }}
        >
          <h3>Result will be displayed here</h3>
          {pred}
        </Box>
        <Button id="pronounceButton" onClick={() => pronounceResult(pred)}>
          Pronounce Result
        </Button>
      </div>
      <div className="description">
        <Typography>
          The application is an "outer wrapper" for a neural network made for a
          research project. It must be said that the neural network is trained
          on the voice of one specific person, so it can generate nonsense for
          you. In addition to voice-to-text recognition, you can voice the
          resulting text in a male or female voice. This is possible thanks to
          the open-source neural network model.
        </Typography>
      </div>
    </>
  );
};
