import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/backButton";
import MediaCard from "../components/mediaCard";
import { useGoveeKey } from "../contexts/GoveeKeyContext";
import "./devices.css";

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [status, setStatus] = useState("Loading");
  const navigate = useNavigate();

  const goveeKey = useGoveeKey();

  useEffect(() => {
    const config = {
      headers: {
        "Govee-API-Key": goveeKey,
      },
    };
    axios
      .get("https://developer-api.govee.com/v1/devices", config)
      .then((res) => {
        if (res.status !== 200) throw new Error(res.statusText);
        let deviceArr = [];
        if (res.data.data.devices) {
          res.data.data.devices.forEach((device) => {
            if (device.controllable) {
              deviceArr.push(<MediaCard data={device} />);
            }
          });
          setDevices(deviceArr);
          setStatus("Success");
        } else setStatus("Empty");
      })
      .catch((err) => {
        if (err.response?.status === 401) setStatus("Unauthorized");
        else {
          setStatus("Error");
          console.error(err);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <BackButton />
        <h2>Devices for:</h2>
        <p>{goveeKey}</p>
        {status === "Loading" && <div>Loading...</div>}
        {status === "Error" && (
          <div>
            <h3>Error getting devices. Please try again later.</h3>
            <button onClick={() => navigate("/")}>Home</button>
          </div>
        )}
        {status === "Unauthorized" && (
          <div>
            <h3>Invalid API Key. Please enter a valid API key.</h3>
            <Button
              size="medium"
              sx={{ backgroundColor: "white" }}
              onClick={() => navigate("/")}
            >
              Home
            </Button>
          </div>
        )}
        {status === "Empty" && (
          <div>
            <h3>There are no available devices on that account.</h3>
            <Button
              size="medium"
              sx={{ backgroundColor: "white" }}
              onClick={() => navigate("/")}
            >
              Home
            </Button>
          </div>
        )}
        {status === "Success" && (
          <div className="device-cards">{devices.map((device) => device)}</div>
        )}
      </header>
    </div>
  );
}
