import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { getRandomWord } from "../data/charades-words";
import Timer from "./Timer";

function GameBoard({ gameConfig, onBackToSetup }) {
  const [currentWord, setCurrentWord] = useState(null);
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [currentTeamTurn, setCurrentTeamTurn] = useState(1);
  const [usedWords, setUsedWords] = useState(new Set());
  const [gameActive, setGameActive] = useState(true);
  const [roundCount, setRoundCount] = useState(1);
  const [timerActive, setTimerActive] = useState(true);
  const [timeLeft, setTimeLeft] = useState(gameConfig.timerSeconds);
  const [roundStarted, setRoundStarted] = useState(false);
  const [timerPaused, setTimerPaused] = useState(false);

  useEffect(() => {
    loadNewWord();
    setRoundStarted(true);
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
    if (timerActive) {
      if (currentTeamTurn === 1) {
        setTeam1Score(team1Score + 1);
      } else {
        setTeam2Score(team2Score + 1);
      }
      loadNewWord();
    }
  };

  const handleSkip = () => {
    if (timerActive) {
      loadNewWord();
    }
  };

  const handleNextRound = () => {
    setRoundCount(roundCount + 1);
    setCurrentTeamTurn(currentTeamTurn === 1 ? 2 : 1);
    setTimerActive(true);
    setTimeLeft(gameConfig.timerSeconds);
    setRoundStarted(true);
    loadNewWord();
  };

  const handleTimerEnd = () => {
    setTimerActive(false);
  };

  const handlePauseToggle = () => {
    setTimerPaused(!timerPaused);
  };

  const isGameOver = roundCount > gameConfig.totalRounds;

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 3, minHeight: "100vh" }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Button variant="outlined" color="error" onClick={onBackToSetup}>
            End Game
          </Button>
        </Box>

        {/* Main Game Card */}
        {gameActive && currentWord && !isGameOver ? (
          <Card
            sx={{
              background: "linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)",
              borderRadius: "24px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
              overflow: "visible",
              position: "relative",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            <CardContent sx={{ p: { xs: 2, md: 4 } }}>
              {/* Minimalist Score Info at Top */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 6,
                  pb: 3,
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <Box sx={{ display: "flex", gap: 4 }}>
                  <Box
                    sx={{
                      textAlign: "center",
                      opacity: currentTeamTurn === 1 ? 1 : 0.5,
                      borderBottom:
                        currentTeamTurn === 1 ? "3px solid #667eea" : "none",
                      pb: currentTeamTurn === 1 ? 1 : 0,
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#666",
                        display: "block",
                        mb: 0.5,
                        fontWeight: currentTeamTurn === 1 ? "bold" : "normal",
                      }}
                    >
                      {gameConfig.team1.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: currentTeamTurn === 1 ? "#667eea" : "#666",
                      }}
                    >
                      {team1Score}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      textAlign: "center",
                      opacity: currentTeamTurn === 2 ? 1 : 0.5,
                      borderBottom:
                        currentTeamTurn === 2 ? "3px solid #764ba2" : "none",
                      pb: currentTeamTurn === 2 ? 1 : 0,
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#666",
                        display: "block",
                        mb: 0.5,
                        fontWeight: currentTeamTurn === 2 ? "bold" : "normal",
                      }}
                    >
                      {gameConfig.team2.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: currentTeamTurn === 2 ? "#764ba2" : "#666",
                      }}
                    >
                      {team2Score}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    variant="caption"
                    sx={{ color: "#999", display: "block" }}
                  >
                    Round {roundCount} of {gameConfig.totalRounds}
                  </Typography>
                </Box>
              </Box>

              {/* Timer Display */}
              <Box sx={{ mb: 6 }}>
                <Timer
                  duration={gameConfig.timerSeconds}
                  isActive={timerActive && !timerPaused}
                  onTimerEnd={handleTimerEnd}
                  timeLeft={timeLeft}
                  setTimeLeft={setTimeLeft}
                />
              </Box>

              {/* Main Word Display - Center Stage */}
              <Box
                sx={{
                  textAlign: "center",
                  my: 6,
                  minHeight: "150px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: "900",
                    fontSize: { xs: "2.5rem", md: "4rem" },
                    color: "#667eea",
                    letterSpacing: "-2px",
                    lineHeight: 1,
                  }}
                >
                  {currentWord}
                </Typography>
              </Box>

              {/* Current Team Indicator - REMOVED */}

              {/* Action Buttons */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                  flexWrap: { xs: "wrap", sm: "nowrap" },
                  mb: 3,
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleCorrect}
                  disabled={!timerActive || timerPaused}
                  sx={{
                    flex: 1,
                    py: 2,
                    fontSize: "1rem",
                    fontWeight: "bold",
                    background:
                      timerActive && !timerPaused
                        ? "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)"
                        : "#ccc",
                    color: "white",
                    borderRadius: "12px",
                    "&:hover":
                      timerActive && !timerPaused
                        ? {
                            background:
                              "linear-gradient(135deg, #45a049 0%, #4CAF50 100%)",
                          }
                        : {},
                    minWidth: "150px",
                  }}
                >
                  ✓ Correct
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSkip}
                  disabled={!timerActive || timerPaused}
                  sx={{
                    flex: 1,
                    py: 2,
                    fontSize: "1rem",
                    fontWeight: "bold",
                    background:
                      timerActive && !timerPaused
                        ? "linear-gradient(135deg, #FF9800 0%, #F57C00 100%)"
                        : "#ccc",
                    color: "white",
                    borderRadius: "12px",
                    "&:hover":
                      timerActive && !timerPaused
                        ? {
                            background:
                              "linear-gradient(135deg, #F57C00 0%, #FF9800 100%)",
                          }
                        : {},
                    minWidth: "150px",
                  }}
                >
                  ⏭️ Skip
                </Button>
              </Box>

              {/* Pause Button */}
              {timerActive && (
                <Box sx={{ textAlign: "center", mb: 4 }}>
                  <Button
                    variant="outlined"
                    onClick={handlePauseToggle}
                    sx={{
                      color: timerPaused ? "#2196F3" : "#666",
                      borderColor: timerPaused ? "#2196F3" : "#ddd",
                      borderWidth: 2,
                      "&:hover": {
                        borderColor: "#2196F3",
                        color: "#2196F3",
                      },
                    }}
                  >
                    {timerPaused ? "▶️ Resume" : "⏸️ Pause"}
                  </Button>
                </Box>
              )}

              {/* Next Round Button */}
              {!timerActive && (
                <Box sx={{ mt: 4, textAlign: "center" }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleNextRound}
                    sx={{
                      py: 2,
                      px: 4,
                      fontSize: "1rem",
                      fontWeight: "bold",
                      background:
                        "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)",
                      color: "white",
                      borderRadius: "12px",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #1976D2 0%, #2196F3 100%)",
                      },
                    }}
                  >
                    Start Next Round
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card sx={{ borderRadius: "24px" }}>
            <CardContent sx={{ textAlign: "center", py: 6 }}>
              <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
                Game Over! 🎉
              </Typography>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Final Scores
              </Typography>
              <Box
                sx={{
                  mb: 4,
                  display: "flex",
                  gap: 4,
                  justifyContent: "center",
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {gameConfig.team1.name}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    {team1Score}
                  </Typography>
                </Box>
                <Typography variant="h4">vs</Typography>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {gameConfig.team2.name}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    {team2Score}
                  </Typography>
                </Box>
              </Box>
              <Button variant="contained" onClick={onBackToSetup} size="large">
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
