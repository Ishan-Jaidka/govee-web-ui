import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MediaCard from "../components/mediaCard";
import "./devices.css";

export default function Devices() {
  const [searchParams] = useSearchParams();
  const [devices, setDevices] = useState([]);
  const [status, setState] = useState("Loading");
  useEffect(() => {
    const config = {
      headers: {
        "Govee-API-Key": searchParams.get("key"),
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
        setState("Success");
      })
      .catch((err) => {
        setState("Error");
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div>Devices for {searchParams.get("key")}</div>
      {status === "Loading" && <div>Loading...</div>}
      {status === "Error" && (
        <div>Error getting projects. Please check back later.</div>
      )}
      {status === "Success" && (
        <div className="device-cards">{devices.map((device) => device)}</div>
      )}
    </div>
  );
}
