import { Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
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

  function deviceOn(on) {
    const config = {
      headers: {
        "Govee-API-Key": goveeKey,
      },
    };
    const body = {
      device: mac,
      model: model,
      cmd: {
        name: "turn",
        value: on ? "on" : "off",
      },
    };
    axios
      .put("https://developer-api.govee.com/v1/devices/control", body, config)
      .then((data) => {
        if (data.status === 200) setPower(on ? "on" : "off");
      })
      .catch((err) => {
        alert("Something went wrong. Please try again later.");
        console.log(err);
      });
  }
  return (
    <div className="deviceinfo-outerdiv">
      <div>
        <table>
          <tr>
            <th>Online</th>
            <th>Power</th>
            {colorTem && <th>Color</th>}
            {brightness && <th>Brightness</th>}
          </tr>
          <tr>
            <td>{online.toString()}</td>
            <td>{power}</td>
            {colorTem && <td>{colorTem}</td>}
            {brightness && <td>{brightness}</td>}
          </tr>
        </table>
      </div>
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
