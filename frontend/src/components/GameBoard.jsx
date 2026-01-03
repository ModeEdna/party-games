import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Paper,
} from "@mui/material";
import { getRandomWord } from "../data/charades-words";
import Timer from "./Timer";
import WordCard from "./WordCard";
import ScoreBoard from "./ScoreBoard";

function GameBoard({ gameConfig, onBackToSetup }) {
  const [currentWord, setCurrentWord] = useState(null);
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [currentTeamTurn, setCurrentTeamTurn] = useState(1);
  const [usedWords, setUsedWords] = useState(new Set());
  const [gameActive, setGameActive] = useState(true);
  const [roundCount, setRoundCount] = useState(1);

  useEffect(() => {
    loadNewWord();
  }, []);

  const loadNewWord = () => {
    let word;
    let attempts = 0;
    do {
      word = getRandomWord(gameConfig.difficulty);
      attempts++;
    } while (usedWords.has(word) && attempts < 50);

    if (attempts < 50) {
      setCurrentWord(word);
      setUsedWords((prev) => new Set([...prev, word]));
    } else {
      setGameActive(false);
    }
  };

  const handleCorrect = () => {
    if (currentTeamTurn === 1) {
      setTeam1Score(team1Score + 1);
    } else {
      setTeam2Score(team2Score + 1);
    }
    loadNewWord();
  };

  const handleSkip = () => {
    setCurrentTeamTurn(currentTeamTurn === 1 ? 2 : 1);
    loadNewWord();
    setRoundCount(roundCount + 1);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            🎭 Charades Game
          </Typography>
          <Button variant="outlined" color="error" onClick={onBackToSetup}>
            End Game
          </Button>
        </Box>

        {/* Score Board */}
        <ScoreBoard
          team1={{ name: gameConfig.team1.name, score: team1Score }}
          team2={{ name: gameConfig.team2.name, score: team2Score }}
          currentTeam={currentTeamTurn}
          roundCount={roundCount}
        />

        {/* Timer */}
        <Box sx={{ mb: 3 }}>
          <Timer duration={gameConfig.timerSeconds} />
        </Box>

        {/* Main Game Area */}
        {gameActive && currentWord ? (
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={8}>
              <WordCard word={currentWord} />

              <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  size="large"
                  onClick={handleCorrect}
                  sx={{ py: 2, fontSize: "1rem", fontWeight: "bold" }}
                >
                  ✓ Guessed Correctly
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="warning"
                  size="large"
                  onClick={handleSkip}
                  sx={{ py: 2, fontSize: "1rem", fontWeight: "bold" }}
                >
                  ⏭️ Skip
                </Button>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Card sx={{ mt: 3 }}>
            <CardContent sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Game Over!
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                All words have been used. Check the scores above!
              </Typography>
              <Button variant="contained" onClick={onBackToSetup}>
                Back to Setup
              </Button>
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
}

export default GameBoard;
