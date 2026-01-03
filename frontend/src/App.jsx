import { useState } from "react";
import { Box } from "@mui/material";
import "./App.css";
import GameSetup from "./components/GameSetup";
import GameBoard from "./components/GameBoard";

function App() {
  const [gameState, setGameState] = useState("setup"); // 'setup' or 'playing'
  const [gameConfig, setGameConfig] = useState(null);

  const handleStartGame = (config) => {
    setGameConfig(config);
    setGameState("playing");
  };

  const handleBackToSetup = () => {
    setGameState("setup");
    setGameConfig(null);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      {gameState === "setup" ? (
        <GameSetup onStartGame={handleStartGame} />
      ) : (
        <GameBoard gameConfig={gameConfig} onBackToSetup={handleBackToSetup} />
      )}
    </Box>
  );
}

export default App;
