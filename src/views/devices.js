import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
        res.data.data.devices.forEach((device) => {
          if (device.controllable) {
            deviceArr.push(<MediaCard data={device} />);
          }
        });
        setDevices(deviceArr);
        setStatus("Success");
      })
      .catch((err) => {
        setStatus("Error");
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <div>Devices for: {goveeKey}</div>
        {status === "Loading" && <div>Loading...</div>}
        {status === "Error" && (
          <div>
            <h3>Error getting devices. Please try again later.</h3>
            <button onClick={() => navigate("/")}>Home</button>
          </div>
        )}
        {status === "Success" && (
          <div className="device-cards">{devices.map((device) => device)}</div>
        )}
      </header>
    </div>
  );
}
