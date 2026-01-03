import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
  ButtonGroup,
} from "@mui/material";
import { getDifficultyLevels } from "../data/charades-words";

function GameSetup({ onStartGame }) {
  const difficulties = getDifficultyLevels();
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [team1Name, setTeam1Name] = useState("Team 1");
  const [team2Name, setTeam2Name] = useState("Team 2");
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [roundCount, setRoundCount] = useState(5);

  const handleStartGame = () => {
    onStartGame({
      difficulty: selectedDifficulty,
      team1: { name: team1Name, score: 0 },
      team2: { name: team2Name, score: 0 },
      timerSeconds: parseInt(timerSeconds) || 60,
      totalRounds: parseInt(roundCount) || 5,
    });
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: 4,
        }}
      >
        <Card sx={{ width: "100%", mb: 3, borderRadius: "16px" }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Select Difficulty
            </Typography>
            <Box
              sx={{
                mb: 3,
                display: "flex",
                gap: 2,
                justifyContent: "space-between",
              }}
            >
              {difficulties.map((level) => (
                <Button
                  key={level.key}
                  variant={
                    selectedDifficulty === level.key ? "contained" : "outlined"
                  }
                  onClick={() => setSelectedDifficulty(level.key)}
                  fullWidth
                  sx={{
                    backgroundColor:
                      selectedDifficulty === level.key
                        ? level.color
                        : "transparent",
                    borderColor: level.color,
                    border: `2px solid ${level.color}`,
                    color:
                      selectedDifficulty === level.key ? "white" : level.color,
                    textAlign: "center",
                    "&:hover": {
                      backgroundColor: level.color,
                      color: "white",
                    },
                  }}
                >
                  {level.label}
                </Button>
              ))}
            </Box>

            <Typography variant="h6" sx={{ mb: 2 }}>
              Team Names
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Team 1"
                  value={team1Name}
                  onChange={(e) => setTeam1Name(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Team 2"
                  value={team2Name}
                  onChange={(e) => setTeam2Name(e.target.value)}
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <Typography variant="h6" sx={{ mb: 2 }}>
              Timer Duration (seconds)
            </Typography>
            <TextField
              fullWidth
              type="number"
              value={timerSeconds}
              onChange={(e) => setTimerSeconds(e.target.value)}
              inputProps={{ min: 10, max: 300, step: 10 }}
              sx={{ mb: 3 }}
            />

            <Typography variant="h6" sx={{ mb: 2 }}>
              Number of Rounds
            </Typography>
            <TextField
              fullWidth
              type="number"
              value={roundCount}
              onChange={(e) => setRoundCount(e.target.value)}
              inputProps={{ min: 1, max: 50, step: 1 }}
              sx={{ mb: 3 }}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleStartGame}
              sx={{
                py: 2,
                fontSize: "1.1rem",
                fontWeight: "bold",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                },
              }}
            >
              Start Game
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default GameSetup;
