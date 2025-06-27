import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { findURLByShortcode, logClick } from "../utils/storage";
import { log } from "../../../Logging Middleware/logger";

function RedirectHandler() {
  const { shortcode } = useParams();
  const [error, setError] = useState("");

  useEffect(() => {
    const entry = findURLByShortcode(shortcode);

    if (!entry) {
      setError("Invalid or unknown shortcode.");
      log("frontend", "error", "page", `Shortcode not found: ${shortcode}`);
      return;
    }

    const now = new Date();
    const expiresAt = new Date(entry.expiresAt);

    if (now > expiresAt) {
      setError("This link has expired.");
      log("frontend", "warn", "page", `Shortcode expired: ${shortcode}`);
      return;
    }

    // Log the click
    logClick(shortcode, {
      timestamp: now.toISOString(),
      referrer: document.referrer || "Direct",
      location: "Unknown", // optional geolocation stub
    });

    log("frontend", "info", "page", `Redirecting shortcode ${shortcode} to ${entry.originalUrl}`);

    // Redirect after small delay
    setTimeout(() => {
      window.location.href = entry.originalUrl;
    }, 1000);
  }, [shortcode]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      {error ? (
        <h2>{error}</h2>
      ) : (
        <h2>Redirecting to your link...</h2>
      )}
    </div>
  );
}

export default RedirectHandler;
