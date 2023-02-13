import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DeviceInfo from "../components/deviceInfo";
import { useGoveeKey } from "../contexts/GoveeKeyContext";

export default function DevicePage() {
  const { state } = useLocation();
  const goveeKey = useGoveeKey();
  const [status, setStatus] = useState("Loading");
  const navigate = useNavigate();
  const [deviceInfo, setDeviceInfo] = useState(null);

  useEffect(() => {
    const config = {
      headers: {
        "Govee-API-Key": goveeKey,
      },
    };
    axios
      .get(
        `https://developer-api.govee.com/v1/devices/state?device=${state.device}&model=${state.model}`,
        config
      )
      .then((data) => {
        if (data.status === 200) {
          const deviceProperties = data.data.data.properties;
          const device = (
            <DeviceInfo
              mac={state.device}
              model={state.model}
              online={deviceProperties[0]?.online ?? false}
              powerState={deviceProperties[1]?.powerState ?? null}
              brightness={deviceProperties[2]?.brightness ?? null}
              colorTem={deviceProperties[4]?.colorTem ?? null}
            />
          );
          setDeviceInfo(device);
          setStatus("Success");
        } else setStatus("Error");
      })
      .catch((err) => {
        console.log(err);
        setStatus("Error");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>{state.deviceName}</h1>
        <div>Mac Address: {state.device}</div>
        <div>Model: {state.model}</div>
        {status === "Success" && <div>{deviceInfo}</div>}
        {status === "Loading" && (
          <div>
            <br />
            <br />
            Loading...
          </div>
        )}
        {status === "Error" && (
          <>
            <br />
            <br />
            <h3>Something went wrong. Please try again.</h3>
            <button onClick={() => navigate("/")}>Home</button>
          </>
        )}
      </header>
    </div>
  );
}
