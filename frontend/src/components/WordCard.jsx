import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

function WordCard({ word }) {
  return (
    <Card
      sx={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        textAlign: "center",
        py: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "300px",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      }}
    >
      <CardContent>
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "4rem" }}>
          {word}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default WordCard;
