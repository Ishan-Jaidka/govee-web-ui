import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function MediaCard({
  width = 395,
  maxWidth = "90vw",
  margin = 1,
  data = null, // {deviceName, device, model, properties, supportCmds}
}) {
  const navigate = useNavigate();
  const cardClicked = () => {
    navigate(`/devices/${data.deviceName}`, { state: data });
  };

  return (
    <Card
      sx={{ width: width, margin: margin, maxWidth: maxWidth }}
      variant="outlined"
      raised={true}
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

      {/* <CardActions>
        {card_action_url && (
          <Button size="small" color="primary" href={card_action_url}>
            GitHub
          </Button>
        )}
        {view_page_url && (
          <Button size="small" color="primary" href={view_page_url}>
            View Page
          </Button>
        )}
        {data.awards && (
          <Button size="small" color="primary" href={data.awards}>
            View Awards
          </Button>
        )}
      </CardActions> */}
    </Card>
  );
}
