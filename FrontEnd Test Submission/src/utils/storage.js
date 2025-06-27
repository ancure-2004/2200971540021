const URL_STORAGE_KEY = "affordmed_short_urls";
const CLICK_LOG_KEY = "affordmed_click_logs";

export function getAllURLs() {
  const raw = localStorage.getItem(URL_STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveURL(newEntry) {
  const urls = getAllURLs();
  urls.push(newEntry);
  localStorage.setItem(URL_STORAGE_KEY, JSON.stringify(urls));
}

export function findURLByShortcode(shortcode) {
  return getAllURLs().find((entry) => entry.shortcode === shortcode);
}

export function logClick(shortcode, metadata) {
  const raw = localStorage.getItem(CLICK_LOG_KEY);
  const clicks = raw ? JSON.parse(raw) : [];

  clicks.push({ shortcode, ...metadata });
  localStorage.setItem(CLICK_LOG_KEY, JSON.stringify(clicks));
}

export function getClicks(shortcode) {
  const raw = localStorage.getItem(CLICK_LOG_KEY);
  const clicks = raw ? JSON.parse(raw) : [];
  return clicks.filter((c) => c.shortcode === shortcode);
}
