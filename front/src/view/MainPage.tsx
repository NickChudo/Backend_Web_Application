import { ChangeEvent, useState } from "react";
import { Header } from "../components/Header";

export const MainPage = () => {
  const [result, setResult] = useState("");
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setResult(value);
    console.log(value);
  };
  return (
    <>
      <Header />
      <div className="fields">
        <input type="file" />
        <textarea
          name="result"
          id="result"
          placeholder="Result will display here"
          defaultValue={result}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="description">
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
