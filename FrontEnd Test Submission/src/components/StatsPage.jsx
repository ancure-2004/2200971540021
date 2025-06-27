import React from "react";
import { getAllURLs, getClicks } from "../utils/storage";
import {
  Typography,
  Paper,
  Container,
  Box,
  Link,
  Divider,
} from "@mui/material";

function StatsPage() {
  const urls = getAllURLs();

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom mt={4}>
        URL Statistics
      </Typography>

      {urls.length === 0 ? (
        <Typography>No shortened URLs found.</Typography>
      ) : (
        urls.map((entry, index) => {
          const clicks = getClicks(entry.shortcode);

          return (
            <Paper key={index} sx={{ padding: 2, marginBottom: 2 }}>
              <Typography variant="h6">
                <Link
                  href={`http://localhost:3000/${entry.shortcode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  http://localhost:3000/{entry.shortcode}
                </Link>
              </Typography>

              <Typography>Original URL: {entry.originalUrl}</Typography>
              <Typography>
                Created: {new Date(entry.createdAt).toLocaleString()}
              </Typography>
              <Typography>
                Expires: {new Date(entry.expiresAt).toLocaleString()}
              </Typography>
              <Typography>Clicks: {clicks.length}</Typography>

              {clicks.length > 0 && (
                <Box mt={2}>
                  <Typography variant="subtitle1">Click Details:</Typography>
                  {clicks.map((click, i) => (
                    <Box key={i} ml={2} mb={1}>
                      <Divider />
                      <Typography>Time: {new Date(click.timestamp).toLocaleString()}</Typography>
                      <Typography>Referrer: {click.referrer}</Typography>
                      <Typography>Location: {click.location}</Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Paper>
          );
        })
      )}
    </Container>
  );
}

export default StatsPage;
