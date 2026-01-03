import React from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";

function ScoreBoard({ team1, team2, currentTeam, roundCount }) {
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid item xs={6}>
        <Card
          sx={{
            backgroundColor:
              currentTeam === 1
                ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                : "#f5f5f5",
            color: currentTeam === 1 ? "white" : "black",
            boxShadow:
              currentTeam === 1
                ? "0 5px 15px rgba(102, 126, 234, 0.4)"
                : "none",
            transition: "all 0.3s ease",
          }}
        >
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {team1.name}
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: "bold", mb: 1 }}>
              {team1.score}
            </Typography>
            {currentTeam === 1 && (
              <Typography variant="caption" sx={{ display: "block" }}>
                Current Turn
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={6}>
        <Card
          sx={{
            backgroundColor:
              currentTeam === 2
                ? "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                : "#f5f5f5",
            color: currentTeam === 2 ? "white" : "black",
            boxShadow:
              currentTeam === 2 ? "0 5px 15px rgba(245, 87, 108, 0.4)" : "none",
            transition: "all 0.3s ease",
          }}
        >
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {team2.name}
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: "bold", mb: 1 }}>
              {team2.score}
            </Typography>
            {currentTeam === 2 && (
              <Typography variant="caption" sx={{ display: "block" }}>
                Current Turn
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Box
          sx={{
            textAlign: "center",
            p: 2,
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
          }}
        >
          <Typography variant="body2" sx={{ color: "#666" }}>
            Round: {roundCount}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ScoreBoard;
