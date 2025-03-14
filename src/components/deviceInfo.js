import { Box, Button, Slider } from "@mui/material";
import axios from "axios";
import React, { useState, useRef } from "react";
import { useGoveeKey } from "../contexts/GoveeKeyContext";
import "./deviceInfo.css";

export default function DeviceInfo({
  mac,
  model,
  online,
  powerState,
  colorTem,
  brightness,
}) {
  const goveeKey = useGoveeKey();
  const [power, setPower] = useState(powerState);
  const [bright, setBrightness] = useState(brightness);
  const debounceRef = useRef(null);

  const sendCommand = (cmd) => {
    const config = {
      headers: {
        "Govee-API-Key": goveeKey,
      },
    };
    const body = {
      device: mac,
      model: model,
      cmd: cmd,
    };
    return axios.put(
      "https://developer-api.govee.com/v1/devices/control",
      body,
      config
    );
  };

  const deviceOn = (on) => {
    sendCommand({ name: "turn", value: on ? "on" : "off" })
      .then((data) => {
        if (data.status === 200) setPower(on ? "on" : "off");
      })
      .catch((err) => {
        alert("Something went wrong. Please try again later.");
        console.error(err);
      });
  };

  const brightnessChanged = (val) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      sendCommand({ name: "brightness", value: val })
        .then((data) => {
          if (data.status === 200) setBrightness(val);
        })
        .catch((err) => {
          alert("Something went wrong. Please try again later.");
          console.error(err);
        });
    }, 1000);
  };

  return (
    <div className="deviceinfo-outerdiv">
      <div>
        <table>
          <thead>
            <tr>
              <th>Online</th>
              <th>Power</th>
              {colorTem && <th>Temperature</th>}
              {brightness && <th>Brightness</th>}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{online.toString()}</td>
              <td>{power}</td>
              {colorTem && <td>{colorTem}</td>}
              {brightness && <td>{bright}</td>}
            </tr>
          </tbody>
        </table>
      </div>
      {brightness && (
        <Box sx={{ width: 1 }}>
          <Slider
            defaultValue={bright}
            step={5}
            valueLabelDisplay="on"
            onChange={(e, val) => brightnessChanged(val)}
          />
        </Box>
      )}
      <div className="deviceinfo-controldiv">
        <Button
          size="medium"
          sx={{ backgroundColor: "white", margin: "2vmin", marginTop: "5vmin" }}
          onClick={() => deviceOn(true)}
        >
          Turn On
        </Button>
        <Button
          size="medium"
          sx={{ backgroundColor: "white", margin: "2vmin", marginTop: "5vmin" }}
          onClick={() => deviceOn(false)}
        >
          Turn Off
        </Button>
      </div>
    </div>
  );
}
