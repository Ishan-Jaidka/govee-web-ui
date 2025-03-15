import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./switchUserButton.css";

export default function SwitchUserButton() {
  const navigate = useNavigate();
  return (
    <div className="switch-user-button">
      <Button
        size="small"
        sx={{ backgroundColor: "white" }}
        onClick={() => {
          sessionStorage.removeItem("goveeKey");
          navigate("/");
        }}
      >
        Switch User
      </Button>
    </div>
  );
}
