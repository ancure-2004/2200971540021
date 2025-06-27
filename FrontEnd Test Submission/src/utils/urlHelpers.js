import { v4 as uuidv4 } from "uuid";

export function isValidURL(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch (e) {
    return false;
  }
}

export function isValidShortcode(code) {
  return /^[a-zA-Z0-9]{1,10}$/.test(code);
}

export function generateShortcode() {
  return uuidv4().slice(0, 6); // random 6-char shortcode
}
