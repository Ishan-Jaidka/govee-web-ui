import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoveeKeyUpdate } from "../contexts/GoveeKeyContext";
import "./home.css";

export default function Home() {
  const navigate = useNavigate();
  const [apiKey, setApiKey] = useState("");

  const setGoveeKey = useGoveeKeyUpdate();

  const submitButton = () => {
    setGoveeKey(apiKey);
    navigate("devices");
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Govee Web UI</h1>
        <div className="outerborderbox">
          <h5>Enter your Govee API Key:</h5>
          <TextField
            fullWidth
            id="api-key"
            label="API Key"
            variant="filled"
            sx={{ backgroundColor: "white" }}
            onChange={(event) => {
              setApiKey(event.target.value);
            }}
          />
          <br />
          <Button
            sx={{ marginTop: "2vmin" }}
            variant="contained"
            onClick={submitButton}
          >
            Submit
          </Button>
        </div>
      </header>
    </div>
  );
}
