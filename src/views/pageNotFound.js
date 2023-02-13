import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <header className="App-header">
        <div className="page-title">This page was not found!</div>
        <div className="page-description">
          It may be in development. Please try again later.
        </div>
        <Button
          size="medium"
          sx={{ backgroundColor: "white" }}
          onClick={() => navigate("/")}
        >
          Home
        </Button>
      </header>
    </div>
  );
}
