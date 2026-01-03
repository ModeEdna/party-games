import React, { useState, useEffect } from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

function Timer({ duration }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsActive(false);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = ((duration - timeLeft) / duration) * 100;
  const isWarning = timeLeft <= 10;

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: isWarning ? "#fff3cd" : "#e3f2fd",
        borderRadius: "10px",
        border: `2px solid ${isWarning ? "#ff6b6b" : "#2196F3"}`,
        textAlign: "center",
      }}
    >
      <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
        ⏱️ Time Remaining
      </Typography>
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          color: isWarning ? "#ff6b6b" : "#2196F3",
          mb: 2,
        }}
      >
        {formatTime(timeLeft)}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 8,
          borderRadius: "5px",
          backgroundColor: "#ddd",
          "& .MuiLinearProgress-bar": {
            backgroundColor: isWarning ? "#ff6b6b" : "#4CAF50",
          },
        }}
      />
    </Box>
  );
}

export default Timer;
