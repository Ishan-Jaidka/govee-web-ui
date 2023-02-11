import React from "react";
import { useLocation } from "react-router-dom";

export default function DevicePage() {
  const { state } = useLocation();

  //   useEffect(() => {
  //     const config = {
  //         headers: {
  //           "Govee-API-Key": searchParams.get("key"),
  //         },
  //       };
  //     axios.get(`https://developer-api.govee.com/v1/devices/state?device=${state.device}&model=${state.model}`, )
  //   }, [])
  return (
    <div>
      <div>{state.deviceName}</div>
      <div>Mac Address: {state.device}</div>
      <div>Model: {state.model}</div>
    </div>
  );
}
