import { ChangeEvent, useState } from "react";
import { Header } from "../components/Header";

export const MainPage = () => {
  const [result, setResult] = useState("");
  const [file, setFile] = useState(null);
  const [pred, setPred] = useState("");
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setResult(value);
    console.log(value);
  };

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
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
        <textarea
          name="result"
          id="result"
          placeholder="Result will display here"
          defaultValue={result}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="description">
        {pred}
        <p>
          The application is an "outer wrapper" for a neural network made for a
          research project. It must be said that the neural network is trained
          on the voice of one specific person, so it can generate nonsense for
          you. In addition to voice-to-text recognition, you can voice the
          resulting text in a male or female voice. This is possible thanks to
          the open-source neural network model.
        </p>
      </div>
    </>
  );
};
