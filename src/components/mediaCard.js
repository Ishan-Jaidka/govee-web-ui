import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGoveeKey } from "../contexts/GoveeKeyContext";

export default function MediaCard({
  width = 275,
  maxWidth = "90vw",
  margin = 1,
  data = null, // {deviceName, device, model, properties, supportCmds}
}) {
  const goveeKey = useGoveeKey();
  const navigate = useNavigate();
  const cardClicked = () => {
    navigate(`/devices/${data.deviceName}`, { state: data });
  };

  function deviceOn(on) {
    const config = {
      headers: {
        "Govee-API-Key": goveeKey,
      },
    };
    const body = {
      device: data.device,
      model: data.model,
      cmd: {
        name: "turn",
        value: on ? "on" : "off",
      },
    };
    axios
      .put("https://developer-api.govee.com/v1/devices/control", body, config)
      .then((data) => {
        // if (data.status === 200) setPower(on ? "on" : "off");
      })
      .catch((err) => {
        alert("Something went wrong. Please try again later.");
        console.log(err);
      });
  }

  return (
    <Card
      sx={{ width: width, margin: margin, maxWidth: maxWidth }}
      variant="outlined"
    >
      <CardActionArea onClick={cardClicked}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.deviceName}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ whiteSpace: "pre-line" }}
          >
            {data.model}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions sx={{ justifyContent: "space-around" }}>
        <Button size="small" color="primary" onClick={() => deviceOn(true)}>
          On
        </Button>
        <Button size="small" color="primary" onClick={() => deviceOn(false)}>
          Off
        </Button>
      </CardActions>
    </Card>
  );
}
