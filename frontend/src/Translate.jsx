import React, { useState, useEffect } from "react";

function Translate() {
  const [text, setText] = useState("");
  const [audioData, setAudioData] = useState(null);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition)();
    recognition.onresult = (event) => {
      setText(event.results[0][0].transcript);
    };

    window.recognition = recognition; // Save recognition instance to the window object

    return () => {
      window.recognition = null; // Cleanup on component unmount
    };
  }, []);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleVoiceInputStart = () => {
    const recognition = window.recognition;
    recognition.lang = language === "en" ? "en-US" : "es-ES"; // Update language
    recognition.start();
  };

  const handleVoiceInputEnd = () => {
    window.recognition.stop();
  };

  const handleTranslate = async () => {
    if (!text) {
      console.error("Text is empty. Cannot proceed with translation.");
      return;
    }

    try {
      const response = await fetch("http://10.0.0.72:8000/text_to_voice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text, language: language }),
      });

      if (response.status !== 200) {
        console.error(`API returned status ${response.status}`);
        return;
      }

      const data = await response.json();
      console.log("Response:", data);

      if (data && data.translated_audio) {
        setAudioData(data.translated_audio);
      } else {
        console.error("translated_audio field is missing in the response");
      }
    } catch (error) {
      console.error("Error calling API:", error);
    }
    setText("");
  };

  const playAudio = () => {
    if (!audioData) {
      console.error("No audio data to play");
      return;
    }

    const audio = new Audio(`data:audio/wav;base64,${audioData}`);
    audio.play();
  };

  useEffect(() => {
    if (audioData) {
      playAudio();
    }
  }, [audioData]);

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="mb-4">Translator</h1>
      </div>
      <div className="my-4">
        <label htmlFor="language-selector" className="form-label">
          Select Language
        </label>
        <select
          id="language-selector"
          className="form-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
        </select>
      </div>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text to translate"
        />
      </div>
      <div className="d-grid gap-2 d-md-flex justify-content-md-center">
        <button className="btn btn-primary" onClick={handleTranslate}>
          Translate
        </button>
        <button className="btn btn-secondary" onClick={playAudio}>
          Play Again
        </button>
        <button
          className="btn btn-info"
          onMouseDown={handleVoiceInputStart}
          onMouseUp={handleVoiceInputEnd}
          onTouchStart={handleVoiceInputStart}
          onTouchEnd={handleVoiceInputEnd}
        >
          Push to Talk
        </button>
      </div>
    </div>
  );
}

export default Translate;
