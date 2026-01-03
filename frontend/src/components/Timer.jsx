import React, { useEffect } from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

function Timer({ duration, isActive, onTimerEnd, timeLeft, setTimeLeft }) {
  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            onTimerEnd();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive]);

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
        textAlign: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          color: isWarning ? "#ff6b6b" : "#667eea",
          mb: 1,
          fontSize: { xs: "2rem", md: "3rem" },
        }}
      >
        {formatTime(timeLeft)}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 6,
          borderRadius: "3px",
          backgroundColor: "#e0e0e0",
          "& .MuiLinearProgress-bar": {
            backgroundColor: isWarning ? "#ff6b6b" : "#667eea",
            borderRadius: "3px",
          },
        }}
      />
    </Box>
  );
}

export default Timer;
