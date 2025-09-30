import axios from 'axios';

// get series by id then return its sets
// Example: Getting sets from a TCG Pocket set
// const response = await fetch('https://api.tcgdex.net/v2/en/series/tcgp');
// const { sets } = await response.json();

// get set by id then return its cards
// // Example: Getting cards from a TCG Pocket set
// const response = await fetch('https://api.tcgdex.net/v2/en/sets/A1');
// const { cards } = await response.json();

// get all series
// // Get all available series to understand the full scope
// const response = await fetch('https://api.tcgdx.net/v2/en/series');
// const series = await response.json();

// get series by id then return its sets
// // Get detailed series data including all sets
// const svCards = await fetch('https://api.tcgdx.net/v2/en/series/sv');
// const { sets } = await svCards.json();

const language = 'en';

const api = axios.create({
    baseURL: `https://api.tcgdex.net/v2/${language}`
});

export default api;
