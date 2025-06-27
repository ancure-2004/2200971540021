import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { isValidURL, isValidShortcode, generateShortcode } from "../utils/urlHelpers";
import { saveURL, getAllURLs } from "../utils/storage";
import { log } from "../../../Logging Middleware/logger";

const DEFAULT_VALIDITY = 30; // in minutes

function ShortenerForm() {
  const [forms, setForms] = useState([{ longUrl: "", validity: "", customCode: "" }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...forms];
    updated[index][field] = value;
    setForms(updated);
  };

  const addMore = () => {
    if (forms.length < 5) {
      setForms([...forms, { longUrl: "", validity: "", customCode: "" }]);
    }
  };

  const handleSubmit = () => {
    const newResults = [];
    let errorOccurred = false;

    forms.forEach((form, i) => {
      const { longUrl, validity, customCode } = form;
      const validTime = parseInt(validity) || DEFAULT_VALIDITY;

      if (!isValidURL(longUrl)) {
        log("frontend", "error", "component", `Invalid URL provided: ${longUrl}`);
        alert(`Row ${i + 1}: Invalid URL`);
        errorOccurred = true;
        return;
      }

      let shortcode = customCode.trim();
      if (shortcode) {
        if (!isValidShortcode(shortcode)) {
          log("frontend", "warn", "component", `Invalid custom shortcode entered: ${shortcode}`);
          alert(`Row ${i + 1}: Invalid shortcode`);
          errorOccurred = true;
          return;
        }

        // Check if shortcode exists
        const exists = getAllURLs().some((entry) => entry.shortcode === shortcode);
        if (exists) {
          log("frontend", "error", "component", `Shortcode collision detected: ${shortcode}`);
          alert(`Row ${i + 1}: Shortcode "${shortcode}" already in use`);
          errorOccurred = true;
          return;
        }
      } else {
        shortcode = generateShortcode();
      }

      const createdAt = new Date();
      const expiresAt = new Date(createdAt.getTime() + validTime * 60000);

      const shortEntry = {
        shortcode,
        originalUrl: longUrl,
        createdAt: createdAt.toISOString(),
        expiresAt: expiresAt.toISOString(),
      };

      saveURL(shortEntry);
      log("frontend", "info", "component", `URL shortened: ${shortEntry.originalUrl} -> ${shortEntry.shortcode}`);

      newResults.push(shortEntry);
    });

    if (!errorOccurred) {
      setResults(newResults);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom mt={4}>
        URL Shortener
      </Typography>

      {forms.map((form, index) => (
        <Paper key={index} sx={{ padding: 2, marginBottom: 2 }}>
          <Typography variant="subtitle1">Entry {index + 1}</Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Original URL"
            value={form.longUrl}
            onChange={(e) => handleChange(index, "longUrl", e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Validity (minutes)"
            type="number"
            value={form.validity}
            onChange={(e) => handleChange(index, "validity", e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Custom Shortcode (optional)"
            value={form.customCode}
            onChange={(e) => handleChange(index, "customCode", e.target.value)}
          />
        </Paper>
      ))}

      <Box display="flex" gap={2} mb={3}>
        <Button variant="contained" onClick={handleSubmit}>
          Shorten URLs
        </Button>
        {forms.length < 5 && (
          <Button variant="outlined" onClick={addMore}>
            + Add Another URL
          </Button>
        )}
      </Box>

      {results.length > 0 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Shortened URLs
          </Typography>
          {results.map((r, i) => (
            <Paper key={i} sx={{ padding: 2, marginBottom: 1 }}>
              <Typography><strong>Short URL:</strong> http://localhost:3000/{r.shortcode}</Typography>
              <Typography><strong>Expires At:</strong> {new Date(r.expiresAt).toLocaleString()}</Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Container>
  );
}

export default ShortenerForm;
