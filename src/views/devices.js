import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/backButton";
import MediaCard from "../components/mediaCard";
import { useGoveeKey } from "../contexts/GoveeKeyContext";
import "./devices.css";
import SwitchUserButton from "../components/switchUserButton";

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [status, setStatus] = useState("Loading");
  const navigate = useNavigate();
  const goveeKey = useGoveeKey();

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const config = { headers: { "Govee-API-Key": goveeKey } };
        const res = await axios.get(
          "https://developer-api.govee.com/v1/devices",
          config
        );
        if (res.status !== 200) throw new Error(res.statusText);

        const deviceArr =
          res.data.data.devices
            ?.filter((device) => device.controllable)
            .map((device) => <MediaCard data={device} />) || [];
        setDevices(deviceArr);
        setStatus(deviceArr.length ? "Success" : "Empty");
      } catch (err) {
        handleFetchError(err);
      }
    };

    const handleFetchError = (err) => {
      if (err.response?.status === 401) setStatus("Unauthorized");
      else if (err.response?.status === 429) setStatus("Rate Limit Exceeded");
      else {
        setStatus("Error");
        console.error(err);
        sessionStorage.removeItem("goveeKey");
        navigate("/");
      }
    };

    fetchDevices();
  }, [goveeKey, navigate]);

  const renderStatusMessage = () => {
    switch (status) {
      case "Loading":
        return <div>Loading...</div>;
      case "Error":
        return renderErrorMessage(
          "Error getting devices. Please try again later."
        );
      case "Unauthorized":
        return renderErrorMessage(
          "Invalid API Key. Please enter a valid API key."
        );
      case "Empty":
        return renderErrorMessage(
          "There are no available devices on that account."
        );
      case "Rate Limit Exceeded":
        return renderErrorMessage(
          "Rate Limit Exceeded, please try again later"
        );
      case "Success":
        return <div className="device-cards">{devices}</div>;
      default:
        return null;
    }
  };

  const renderErrorMessage = (message) => (
    <div>
      <h3>{message}</h3>
      <Button
        size="medium"
        sx={{ backgroundColor: "white" }}
        onClick={() => {
          sessionStorage.removeItem("goveeKey");
          navigate("/");
        }}
      >
        Home
      </Button>
    </div>
  );

  return (
    <div className="App">
      <header className="App-header">
        <BackButton />
        <SwitchUserButton />
        <h2>Devices for:</h2>
        <p>{goveeKey}</p>
        {renderStatusMessage()}
      </header>
    </div>
  );
}
