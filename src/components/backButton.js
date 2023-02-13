import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./backButton.css";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <div className="back-button">
      <Button
        size="small"
        sx={{ backgroundColor: "white" }}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
    </div>
  );
}
