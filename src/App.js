import "./App.css";
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

function App() {
  const [prompt, setPrompt] = useState("0");
  const [result, setResult] = useState("");

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });

    setResult(res.data.data[0].url);
  };
  return (
    <div className="App">
      <h2>Generate an Image using Open AI API</h2>
      <h4>Use "-" instead of space button!</h4>
      <textarea
        placeholder="let's generate an image..."
        onChange={(e) => setPrompt(e.target.value)}
      />
      <br />
      <button onClick={generateImage}>Generate an Image</button>
      <hr />
      {result.length > 0 ? <img src={result} alt="ai img" /> : <p>No data!</p>}
    </div>
  );
}

export default App;
